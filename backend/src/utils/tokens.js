import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export function signAccessToken(payload) {
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
    expiresIn: ENV.ACCESS_TOKEN_TTL,
  });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.REFRESH_TOKEN_TTL,
  });
}

export function verifyAccess(token) {
  return jwt.verify(token, ENV.JWT_ACCESS_SECRET);
}

export function verifyRefresh(token) {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET);
}
