import crypto from "crypto";
import { supabaseAdmin } from "./supabase";

// Simple in-memory session store (should use Redis/database in production)
const sessionStore = new Map<string, { username: string; expiresAt: number }>();

// Clean up expired sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessionStore.entries()) {
    if (session.expiresAt < now) {
      sessionStore.delete(token);
    }
  }
}, 60000); // Clean every minute

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function createSession(username: string): string {
  const token = generateToken();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  sessionStore.set(token, { username, expiresAt });
  return token;
}

export function validateSession(token: string): {
  valid: boolean;
  username?: string;
} {
  const session = sessionStore.get(token);

  if (!session) {
    return { valid: false };
  }

  if (session.expiresAt < Date.now()) {
    sessionStore.delete(token);
    return { valid: false };
  }

  return { valid: true, username: session.username };
}

export function destroySession(token: string): void {
  sessionStore.delete(token);
}

export async function validateCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  // First try Supabase
  if (supabaseAdmin) {
    try {
      console.log("Validating credentials against Supabase admin_users table");

      const { data, error } = await supabaseAdmin
        .from("admin_users")
        .select("id, username, password_hash")
        .eq("username", username)
        .single();

      if (error) {
        console.log("Admin user not found in Supabase:", username);
        // Fall back to environment variables if Supabase fails
        return validateCredentialsFromEnv(username, password);
      }

      if (!data) {
        console.log("No admin user data returned");
        return validateCredentialsFromEnv(username, password);
      }

      // Simple password comparison (in production, use proper hashing like bcrypt)
      return data.password_hash === password;
    } catch (err) {
      console.error("Error validating credentials from Supabase:", err);
      // Fall back to environment variables
      return validateCredentialsFromEnv(username, password);
    }
  }

  // Fall back to environment variables if Supabase not configured
  return validateCredentialsFromEnv(username, password);
}

function validateCredentialsFromEnv(
  username: string,
  password: string,
): boolean {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "password";

  try {
    // Check if lengths match first (timing-safe comparison requires same length)
    const usernameMatch =
      username.length === adminUsername.length &&
      crypto.timingSafeEqual(Buffer.from(username), Buffer.from(adminUsername));

    const passwordMatch =
      password.length === adminPassword.length &&
      crypto.timingSafeEqual(Buffer.from(password), Buffer.from(adminPassword));

    return usernameMatch && passwordMatch;
  } catch (error) {
    // Fallback to simple comparison if timing-safe comparison fails
    return username === adminUsername && password === adminPassword;
  }
}
