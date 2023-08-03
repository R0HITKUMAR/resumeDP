import express from "express";
var resumee = express.Router();
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { sendWelcomeMail } from "../mail/Mail.js";
import config from "../../config.js";

resumee.post("/register", async (req, res) => {
  const user = req.body;
  const takenEmail = await User.findOne({ email: user.email });

  if (takenEmail) {
    res.send({ success: false, message: "Account already Exists" });
  } else {
    user.password = await bcrypt.hash(user.password, 10);
    const dbUser = new User({
      email: user.email,
      password: user.password,
    });
    dbUser
      .save()
      .then((user) => {
        sendWelcomeMail(user.email);
        res.send({
          success: true,
          message: "Account Created Successfully! Please Login",
        });
      })
      .catch((err) => {
        res.send({ success: false, message: err });
      });
  }
});

export default resumee;
