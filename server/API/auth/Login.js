import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function Login(req, res) {
  const userLoggingIn = req.body;

  User.findOne({ email: userLoggingIn.email }).then((dbUser) => {
    if (!dbUser) {
      return res.send({ message: "No Account Found with this Email" });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            userName: dbUser.userName,
            email: dbUser.email,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "864000000" },
            (err, token) => {
              if (err) return res.data({ message: err });
              return res.send({
                message: "Logged In Successfully",
                token: token,
                email: req.body.email,
                userName: payload.userName,
              });
            }
          );
        } else {
          return res.send({ message: "Incorrect Password" });
        }
      });
  });
}

function VerifyUserName(req, res) {
  const userName = req.params.userName;
  User.findOne({ userName: userName }).then((dbUser) => {
    if (dbUser) {
      // Send Json Response
      return res.send(
        { message: "Username Already Exists" },
        { email: dbUser.email }
      );
    } else if (!dbUser) {
      return res.send({ message: "Username Available" });
    }
  });
}

export { Login, VerifyUserName };
