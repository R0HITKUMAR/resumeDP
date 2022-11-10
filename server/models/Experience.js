import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    position: String,
    company: String,
    duration: String,
    type: String,
    des: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Experience = new mongoose.model("Experience", experienceSchema);

export default Experience;
