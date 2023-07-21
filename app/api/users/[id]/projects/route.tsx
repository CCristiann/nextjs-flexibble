import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Project from "@/models/project";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};
export async function GET(req: Request, { params }: Props) {
  try {
    await connectToDB();

    const relatedProjects = await Project.find({"creator" : params.id})

    return NextResponse.json(relatedProjects, { status: 200 });
    
  } catch {
    return NextResponse.json({ message: "Failed to fetch related projects" }, { status: 500 });
  }
}
