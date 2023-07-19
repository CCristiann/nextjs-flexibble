import Project from "@/models/project";
import { connectToDB } from "@/utils/database";

type Props = {
  params: {
    id: string;
  };
};

export async function GET({ params }: Props) {
  try {
    await connectToDB();

    const project = await Project.findById(params.id);

    if (!project) return new Response("Project not found", { status: 404 });

    return new Response(JSON.stringify(project), { status: 200 });
  } catch {
    return new Response("Failed to fetch the project", { status: 500 });
  }
}

export async function DELETE({ params }: Props) {
  try {
    await connectToDB();

    const existingProject = await Project.findByIdAndRemove(params.id);

    if (!existingProject) return new Response("Project not found.", { status: 404 });
    
  } catch {
    return new Response("Failed to fetch the project", { status: 500 });
  }
}
