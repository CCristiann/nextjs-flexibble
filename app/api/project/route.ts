import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request, category : string | undefined) {
  console.log(category)
  try {
    await connectToDB();
            
    const allProjects = await Project.find({});

    return NextResponse.json(allProjects, { status: 500 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
