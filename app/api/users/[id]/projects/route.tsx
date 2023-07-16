import { connectToDB } from "@/utils/database";
import RelatedProjects from "@/components/RelatedProjects";
import User from "@/models/user";

type Props = {
    params: {
        id: string
    }
}
export async function GET (req: Request, { params } : Props) {

    try{
        await connectToDB()
        
        const existingUser = await User.findById(params.id)

        const relatedProjects = existingUser.projects


        return new Response(JSON.stringify(relatedProjects), { status: 200 })
    } catch {
        return new Response('Failed to fetch related projects',{ status: 500 })
    }
}