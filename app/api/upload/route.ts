import { v2 as cloudinary } from 'cloudinary'
import { unique } from 'next/dist/build/utils';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
  });

export async function POST(req: Request) {
    const { path } = await req.json()

    if(!path) return new Response("Image path is required.", { status: 400 })

    try{
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            transformation: [{ width: 414, height: 314, crop: 'scale' }]

        }

        const result = await cloudinary.uploader.upload(path, options)
        
        const image = result.secure_url
        return new Response(JSON.stringify(image), { status: 200 })

    }catch (err) {
        return new Response("An error occured uploading image", { status: 500 })
    }
}