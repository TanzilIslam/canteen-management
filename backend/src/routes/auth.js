// src/routes/auth.js
import { Router } from "express";
import { z } from "zod";
import { User } from "../models/User.js";
import { signAccessToken, verifyAccess } from "../utils/tokens.js";

const router = Router();

const credsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
});

// Register
router.post("/register", async (req, res) => {
  const parsed = credsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

  const { email, password, name } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const user = await User.create({ email, password, name });
  const payload = { id: user._id.toString(), email: user.email };
  const token = signAccessToken(payload);

  res.status(201).json({ user: payload, accessToken: token });
});

// Login
router.post("/login", async (req, res) => {
  const parsed = credsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const payload = { id: user._id.toString(), email: user.email };
  const token = signAccessToken(payload);

  res.json({ user: payload, accessToken: token });
});

// Protected "me"
router.get("/me", async (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = verifyAccess(token);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

export default router;
