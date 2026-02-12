import { Request, Response } from "express";
import { supabaseAdmin } from "../supabase";
import { createSession, destroySession, validateSession } from "../auth";

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    // Trim whitespace and validate required fields
    const trimmedUsername = typeof username === 'string' ? username.trim() : '';
    const trimmedPassword = typeof password === 'string' ? password.trim() : '';

    if (!trimmedUsername || !trimmedPassword) {
      console.log("Login attempt with missing credentials");
      return res.status(400).json({
        error: "Missing username or password",
      });
    }

    console.log("Login attempt for:", trimmedUsername);

    // Authenticate using Supabase Auth
    if (!supabaseAdmin) {
      console.error("Supabase not configured");
      return res.status(500).json({
        error: "Authentication service not available",
      });
    }

    try {
      // Sign in with Supabase Auth
      const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email: trimmedUsername, // Using username field as email in Supabase
        password: trimmedPassword,
      });

      if (error || !data.session) {
        console.log("Authentication failed:", trimmedUsername, error?.message);
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      // Get user info from Supabase Auth
      const user = data.user;
      console.log("User authenticated:", user.email);

      // Create our own session token for consistency with existing system
      const token = createSession(user.email || trimmedUsername);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        username: user.email || trimmedUsername,
      });
    } catch (authError) {
      console.error("Supabase auth error:", authError);
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in login route:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: "Token is required",
      });
    }

    destroySession(token);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error in logout route:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function validateToken(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        valid: false,
        error: "No token provided",
      });
    }

    const validation = validateSession(token);

    if (!validation.valid) {
      return res.status(401).json({
        valid: false,
        error: "Invalid or expired token",
      });
    }

    return res.status(200).json({
      valid: true,
      username: validation.username,
    });
  } catch (error) {
    console.error("Error in validate-token route:", error);
    return res.status(500).json({
      valid: false,
      error: "Internal server error",
    });
  }
}
