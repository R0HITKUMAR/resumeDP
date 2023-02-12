import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: 5000,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PASSPORTSECRET: process.env.PASSPORTSECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,                                              
};

export default config;
