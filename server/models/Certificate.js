import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: String,
    no: String,
    issued_by: String,
    issued_on: String,
    verify: String,
    view: String,
    email: String,
  },
  { timestamps: true }
);

const Certificate = new mongoose.model("Certifications", certificateSchema);

export default Certificate;