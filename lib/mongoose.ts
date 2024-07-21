import mongoose, { ConnectOptions } from "mongoose";

let isConnnected: boolean = false;

export const connectToDatabase = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL must be specified");
  }

  if (isConnnected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "netflix",
      autoCreate: true,
    };

    await mongoose.connect(process.env.MONGODB_URL, options);
    isConnnected = true;
    console.log("MongoDB connected");
  } catch (e) {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running..."
    );
  }
};
