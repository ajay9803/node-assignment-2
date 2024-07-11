import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  accesstoken_expiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshtoken_expiry: process.env.REFRESH_TOKEN_EXPIRY,
};

export default config;
