import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    affiliation: String,
    field: String,
    year: String,
    grade: String,
    des: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Education = new mongoose.model("Education", educationSchema);

export default Education;
