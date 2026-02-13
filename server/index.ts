import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { sendEmail } from "./routes/send-email";
import { login, logout, validateToken } from "./routes/auth";

// Simple in-memory rate limiter
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function simpleRateLimit(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const ip = req.ip || "unknown";
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (limit && limit.resetTime > now) {
    if (limit.count >= 5) {
      // 5 requests per minute
      return res
        .status(429)
        .json({ error: "Too many requests. Please try again later." });
    }
    limit.count++;
  } else {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
  }

  next();
}

export function createServer() {
  const app = express();

  // Security headers
  app.use((req, res, next) => {
    // Prevent MIME type sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Prevent clickjacking attacks
    res.setHeader("X-Frame-Options", "DENY");

    // Enable XSS protection
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // HSTS (force HTTPS)
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );

    // Control referrer information
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    // Disable powerful features
    res.setHeader(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=(), payment=()",
    );

    // Content Security Policy - prevents inline scripts and restricts resource loading
    const cspHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
      "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:",
      "img-src 'self' https: data: blob:",
      "connect-src 'self' https: wss:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
    res.setHeader("Content-Security-Policy", cspHeader);

    next();
  });

  // CORS configuration - allow development and production domains
  const allowedOrigins = (
    process.env.ALLOWED_ORIGINS ||
    "http://localhost:5173,http://localhost:3000,http://localhost:8080"
  ).split(",");
  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) {
          callback(null, true);
          return;
        }

        // Check if origin is in allowed list
        if (
          allowedOrigins.some((allowed) => {
            const cleanOrigin = origin.trim();
            const cleanAllowed = allowed.trim();
            return (
              cleanOrigin === cleanAllowed || cleanOrigin.includes(cleanAllowed)
            );
          })
        ) {
          callback(null, true);
        } else {
          // Log CORS rejections for debugging
          console.warn(`CORS rejected origin: ${origin}`);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  // Request size limits
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Rate limiting middleware for email endpoint
  app.use("/api/send-email", simpleRateLimit);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Email route
  app.post("/api/send-email", sendEmail);

  // Authentication routes
  app.post("/api/auth/login", login);
  app.post("/api/auth/logout", logout);
  app.get("/api/auth/validate", validateToken);

  // Global error handler
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.error("Server error:", err);
      res.status(err.status || 500).json({
        error: err.message || "Internal server error",
      });
    },
  );

  return app;
}
