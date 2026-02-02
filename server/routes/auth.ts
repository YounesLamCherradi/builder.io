import { Request, Response } from "express";
import {
  validateCredentials,
  createSession,
  destroySession,
  validateSession,
} from "../auth";

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        error: "Missing username or password",
      });
    }

    // Log for debugging
    console.log("Login attempt for:", username);
    console.log("ADMIN_USERNAME env:", process.env.ADMIN_USERNAME ? "set" : "not set");
    console.log("ADMIN_PASSWORD env:", process.env.ADMIN_PASSWORD ? "set" : "not set");

    // Validate credentials
    if (!validateCredentials(username, password)) {
      console.log("Invalid credentials for user:", username);
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Create session
    const token = createSession(username);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      username,
    });
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
