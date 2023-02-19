import express from "express";
var resumee = express.Router();

import dashboard from "../API/Dashboard.js";

resumee.get("/:email/get", dashboard);

export default resumee;
