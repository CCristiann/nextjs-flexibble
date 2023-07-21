import Project from "@/models/project";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description, image, liveSiteUrl, githubUrl, category, user } =
    await req.json();

  try {
    await connectToDB();

    const newProject = new Project({
      creator: user.id,
      title: title,
      description: description,
      image: image,
      liveSiteUrl: liveSiteUrl,
      githubUrl: githubUrl,
      category: category,
    });

    await User.findByIdAndUpdate(user.id, {
        $push: {projects: newProject._id}
    });

    await newProject.save();

    return NextResponse.json(newProject, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to create new project" }, { status: 500 });
  }
}
