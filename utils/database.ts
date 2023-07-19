import mongoose, { ConnectOptions } from "mongoose";

const url = process.env.MONGODB_URI?.toString()

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is connected");
    return;
  }

  try {
    await mongoose.connect(
      url as string,
      {
        dbName: "flexibble",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};
