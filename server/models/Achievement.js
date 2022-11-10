import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    year: String,
    title: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Achievement = new mongoose.model("Achievement", achievementSchema);

export default Achievement;
