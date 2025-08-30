export const ENV = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/restaurant",
  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET || "dev_access_secret_change_me",
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "dev_refresh_secret_change_me",
  ACCESS_TOKEN_TTL: "15m",
  REFRESH_TOKEN_TTL: "7d",
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || undefined, // e.g. ".yourdomain.com" in prod
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173", // your Vue app
  SECURE_COOKIES: process.env.NODE_ENV === "production",
};
