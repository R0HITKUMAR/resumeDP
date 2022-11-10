import express from "express";
var resumee = express.Router();
import {
  addProject,
  retrieveProject,
  retrieveProjects,
  deleteProject,
  updateProject,
} from "../API/Project.js";

// Projects Functions
resumee.post("/add", addProject);
resumee.get("/retrieveAll/:email", retrieveProjects);
resumee.get("/retrieveOne/:id", retrieveProject);
resumee.delete("/delete/:id", deleteProject);
resumee.put("/update/:id", updateProject);

export default resumee;
