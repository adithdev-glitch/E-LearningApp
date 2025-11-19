import mongoose from "mongoose";
import "dotenv/config.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};