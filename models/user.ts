import mongoose, { Schema, model, models } from "mongoose";
import { ProjectSchema } from "./project";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists."],
    required: [true, "Email is required."],
  },
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  image: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  linkedInUrl: {
    type: String,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
