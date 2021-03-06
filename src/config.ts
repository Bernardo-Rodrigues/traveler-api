import "dotenv/config";

export default {
  port: process.env.PORT || 5000,
  secretCryptr: process.env.SECRET_CRYPTR,
  secretJWT: process.env.SECRET_JWT,
  clerApiKey: process.env.CLERK_API_KEY,
  environment: process.env.ENVIRONMENT,
};
