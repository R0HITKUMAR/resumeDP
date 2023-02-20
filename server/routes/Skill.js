import express from "express";
var resumee = express.Router();

import { addSkills, retrieveSkills, updateSkills } from "../API/Skill.js";

resumee.post("/add", addSkills);
resumee.get("/retrieve/:email", retrieveSkills);
resumee.put("/update/:id", updateSkills);

export default resumee;
