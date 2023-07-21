import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string
  }
}
export async function GET(req: Request, { params }: Props) {

  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ message: "Failed to fetch user data" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params } : Props){
  const projectId = await req.json()

  try {
    await connectToDB();

    await User.findByIdAndUpdate(params.id, {
      $pull: {projects: projectId}
    });

  } catch {
    return NextResponse.json({ message: "Failed to update user data" }, { status: 500 });
  }
}
