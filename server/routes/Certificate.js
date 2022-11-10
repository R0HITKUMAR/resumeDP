import express from "express";
var resumee = express.Router();

import {
  addCertificate,
  retrieveCertificate,
  retrieveCertificates,
  deleteCertificate,
  updateCertificate,
} from "../API/Certificate.js";


resumee.post("/add", addCertificate);
resumee.get("/retrieveAll/:email", retrieveCertificates);
resumee.get("/retrieveOne/:id", retrieveCertificate);
resumee.delete("/delete/:id", deleteCertificate);
resumee.put("/update/:id", updateCertificate);

export default resumee;
