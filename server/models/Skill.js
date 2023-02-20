import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    technical: String,
    hobbies: String,
    language: String,
    extra_curricular: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Skills = new mongoose.model("Skills", skillsSchema);

export default Skills;