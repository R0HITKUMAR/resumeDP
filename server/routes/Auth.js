import express from "express";
var resumee = express.Router();

import { Login } from "../API/auth/Login.js";
import Register from "../API/auth/Register.js";
import verifyLogin from "../API/auth/Validate.js";
import changepassword from "../API/auth/Reset.js";
import { sendOTP, sendVOTP } from "../API/auth/OTPMail.js";

resumee.post("/login", Login);
resumee.post("/register", Register);
resumee.get("/validate/:token", verifyLogin);
resumee.post("/changepassword", changepassword);
resumee.post("/sendotp", sendOTP);
resumee.post("/sendVotp", sendVOTP);

export default resumee;
