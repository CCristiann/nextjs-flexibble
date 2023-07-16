import Project from "@/models/project";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function POST(req: Request) {
    
    const { title, description, image, liveSiteUrl, githubUrl, category, user} = await req.json()
    try{
        await connectToDB()

        const newProject = new Project({
            creator: {
                name: user.name,
                email: user.email,
                image: user.image,
                _id: user.id
            },
            title: title,
            description: description,
            image: image,
            liveSiteUrl: liveSiteUrl,
            githubUrl: githubUrl,
            category: category,
          })

          const existingUser = await User.findById(newProject.creator._id)

          existingUser.projects.push(newProject)

          await existingUser.save()
          await newProject.save();
          
          return new Response(JSON.stringify(newProject), { status: 200 });
    } catch (err) {
          return new Response('Failed to create new project', { status: 500 });
    }

}
