import mongoose from "mongoose";

const introductionSchema = new mongoose.Schema(
  {
    name: String,
    dob: String,
    email: String,
    phone: String,
    address: String,
    link1N: String,
    link1: String,
    link2N: String,
    link2: String,
    link3N: String,
    link3: String,
    link4N: String,
    link4: String,
    position: String,
    careerObjective: String,
    img: String,
    emailid: String,
  },
  {
    timestamps: true,
  }
);

const Introduction = new mongoose.model("Introduction", introductionSchema);

export default Introduction;
