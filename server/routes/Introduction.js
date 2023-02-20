import express from "express";
var resumee = express.Router();

import {
  addIntroduction,
  retrieveIntroduction,
  updateIntroduction,
} from "../API/Introduction.js";

// Introduction Functions
resumee.post("/add", addIntroduction);
resumee.get("/retrieve/:email", retrieveIntroduction);
resumee.put("/update/:id", updateIntroduction);

export default resumee;
