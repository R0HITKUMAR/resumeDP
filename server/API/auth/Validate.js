import express from "express";
import jwt from "jsonwebtoken";

var resumee = express.Router();

function verifyJWT(req, res, next) {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.send({
          isLogged: false,
          message: "Failed to Authenticate",
        });
      }
      res.email = decoded.email;
      res.userName = decoded.userName;
      next();
    });
  } else {
    console.log("Incorrect Token");
    return res.send({
      isLogged: false,
      message: "Incorrect Token Provided",
    });
  }
}

resumee.get("/validate/:token", verifyJWT, (req, res) => {
  res.send({
    isLogged: true,
    message: "Logged In",
    email: res.email,
    userName: res.userName,
  });
});

export default resumee;
