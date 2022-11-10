import User from "../../models/User.js";
import { sendOTPMail } from "../mail/Mail.js";

function sendOTP(req, res) {
  const user = req.body;
  const dbUser = User.findOne({ email: user.email });
  if (!dbUser) {
    return res.send({
      success: false,
      message: "No Account Found with this Email",
    });
  } else {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp).toString();
    console.log(otp);
    sendOTPMail(
      user.email,
      otp,
      "reset your Password",
      "OTP for Password Reset from Resumee"
    );
    return res.send({
      success: true,
      message: "OTP Sent Successfully",
      otp: otp,
    });
  }
}

function sendVOTP(req, res) {
  const user = req.body;
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp).toString();
  console.log(otp);
  sendOTPMail(
    user.email,
    otp,
    "verify your Account",
    "OTP for Account Verification from Resumee"
  );
  return res.send({
    success: true,
    message: "OTP Sent Successfully",
    otp: otp,
  });
}

export { sendOTP, sendVOTP };
