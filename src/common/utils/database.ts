import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("==> Mongo Already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MANGODB_URL!, {
      dbName: "tedxccet",
    });
    isConnected = true;
    console.log("==> Mongo Sucessfully connected");
  } catch (error) {
    console.log(error);
  }
};
