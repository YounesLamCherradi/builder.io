import crypto from "crypto";

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
