import dotenv from "dotenv";

dotenv.config();

// basic port configuration as env
const config = {
  port: process.env.PORT,
};

export default config;
