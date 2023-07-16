import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
    creator: {
        name: String,
        email: String,
        image: String,
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
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
    }

})

const Project = models.Project || model("Project", ProjectSchema);

export default Project;