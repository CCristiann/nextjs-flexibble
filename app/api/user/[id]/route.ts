import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function GET(req: Request, { params } : any){
    try{
        await connectToDB()

        const user = await User.findById(params.id)

        if(!user) return new Response('User not found', { status: 404})

        return new Response(JSON.stringify(user), { status: 200})
    } catch {
        return new Response('Failed to fetch user data', { status: 500})
    }
}