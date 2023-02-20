import express from "express";
var resumee = express.Router();

import {
  addEducation,
  retrieveEducation,
  retrieveEducations,
  deleteEducation,
  updateEducation,
} from "../API/Education.js";

// Projects Functions
resumee.post("/add", addEducation);
resumee.get("/retrieveAll/:email", retrieveEducations);
resumee.get("/retrieveOne/:id", retrieveEducation);
resumee.delete("/delete/:id", deleteEducation);
resumee.put("/update/:id", updateEducation);

export default resumee;
