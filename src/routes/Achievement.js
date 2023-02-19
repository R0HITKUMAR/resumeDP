import express from "express";
var resumee = express.Router();

import {
  addAchievement,
  retrieveAchievement,
  retrieveAchievements,
  deleteAchievement,
  updateAchievement,
} from "../API/Achievement.js";

// Projects Functions
resumee.post("/add", addAchievement);
resumee.get("/retrieveAll/:email", retrieveAchievements);
resumee.get("/retrieveOne/:id", retrieveAchievement);
resumee.delete("/delete/:id", deleteAchievement);
resumee.put("/update/:id", updateAchievement);

export default resumee;
