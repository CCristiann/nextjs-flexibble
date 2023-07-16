import Project from "@/models/project";
import { connectToDB } from "@/utils/database";

type Props = {
    params: {
        id: string
    }
}
export async function GET(req: Request , { params } : Props) {
    try{
        await connectToDB()

        const project = await Project.findById(params.id).populate('creator')

        if(!project) return new Response('Project not found', { status: 404 })

        return new Response(JSON.stringify(project), { status: 200 })
    } catch {
        return new Response('Failed to fetch the project', { status: 500 })
    }
}