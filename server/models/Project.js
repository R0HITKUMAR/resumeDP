import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: String,
    duration: String,
    url: String,
    domain: String,
    technology: String,
    desc: String,
    learn: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Project = new mongoose.model("Project", projectSchema);

export default Project;
