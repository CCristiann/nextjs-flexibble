import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set("strictQuery", true)

    if(isConnected) {
        console.log("MongoDB is connected")
        return
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "flexibble",
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions)

        isConnected = true
        
    } catch (err){
        console.log(err)
    }
}