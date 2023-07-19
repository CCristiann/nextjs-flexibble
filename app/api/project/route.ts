import Project from "@/models/project";
import { connectToDB } from "@/utils/database";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const allProjects = await Project.find({});

    return new Response(JSON.stringify(allProjects), { status: 200 });
  } catch {
    return new Response("Failed to fetch all projects", { status: 500 });
  }
}
