import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Project from "@/models/project";

type Props = {
  params: {
    id: string;
  };
};
export async function GET(req: Request, { params }: Props) {
  try {
    await connectToDB();

    const relatedProjects = await Project.find({"creator" : params.id})

    return new Response(JSON.stringify(relatedProjects), { status: 200 });
  } catch {
    return new Response("Failed to fetch related projects", { status: 500 });
  }
}
