import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";

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
            email: dbUser.email,
          };
          jwt.sign(
            payload,
            config.JWT_SECRET,
            { expiresIn: "864000000" },
            (err, token) => {
              if (err) return res.data({ message: err });
              return res.send({
                message: "Logged In Successfully",
                token: token,
                email: req.body.email
              });
            }
          );
        } else {
          return res.send({ message: "Incorrect Password" });
        }
      });
  });
}

export { Login};
