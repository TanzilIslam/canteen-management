import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/auth.js";
import { requireAuth } from "./middleware/auth.js";

const app = express();

// Security & basic middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.CORS_ORIGIN,
    credentials: true,
  })
);

// Rate limit auth endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/auth", authLimiter);

// Make cookie options available to routes
// app.set("cookieOptions", {
//   secure: ENV.SECURE_COOKIES,
//   domain: ENV.COOKIE_DOMAIN,
// });

app.get("/health", (_, res) => res.json({ ok: true }));

// Routes
app.use("/api/auth", authRoutes);
// Protect /api/auth/me with requireAuth
app.get("/api/auth/me", requireAuth, (req, res, next) => next()); // pass through
// NOTE: The /me handler is defined inside routes/auth.js, above.

// Start
mongoose
  .connect(ENV.MONGO_URI)
  .then(() => {
    app.listen(ENV.PORT, () => {
      console.log(`Auth server running http://localhost:${ENV.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });
