import express from "express";
var resumee = express.Router();

import {
    addExperience,
    retrieveExperience,
    retrieveExperiences,
    deleteExperience,
    updateExperience,
} from "../API/Experience.js";


resumee.post("/add", addExperience);
resumee.get("/retrieveAll/:email", retrieveExperiences);
resumee.get("/retrieveOne/:id", retrieveExperience);
resumee.delete("/delete/:id", deleteExperience);
resumee.put("/update/:id", updateExperience);

export default resumee;
