import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { test } from "node:test";

type Props = {
  params: {
    id: string
  }
}
export async function GET(req: Request, { params }: Props) {

  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch {
    return new Response("Failed to fetch user data", { status: 500 });
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
    return new Response("Failed to fetch user data", { status: 500 });
  }
}
