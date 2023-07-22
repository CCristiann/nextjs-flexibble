import Project from "@/models/project";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  try {
    await connectToDB();

    const project = await Project.findById(params.id);
    const user = await User.find({"projects" : params.id})

    if (!project) return NextResponse.json({ message: "Project not found" }, { status: 404 });

    return NextResponse.json({project: project, user: user}, { status: 200 });

  } catch {
    return NextResponse.json({ message: "Failed to fetch the project" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params } : Props) {

  try {
    await connectToDB();

    const existingProject = await Project.findByIdAndRemove(params.id);

    if (!existingProject) return NextResponse.json({ message: "Project not found" }, { status: 404 })
    
  } catch {
    return NextResponse.json({ message: "Failed to delete the project" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params } : Props) {
  const { title, description, image, liveSiteUrl, githubUrl, category } = await req.json();

  try {
    await connectToDB();

    const existingProject = await Project.findByIdAndUpdate(params.id, {
      title: title,
      description: description,
      image: image,
      liveSiteUrl: liveSiteUrl,
      githubUrl: githubUrl,
      category: category
    });

    if (!existingProject) return NextResponse.json({ message: "Project not found" }, { status: 404 })

    await existingProject.save()
    
  } catch {
    return NextResponse.json({ message: "Failed to delete the project" }, { status: 500 });
  }
}
