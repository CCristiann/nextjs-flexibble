import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

export const ProjectSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  liveSiteUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
