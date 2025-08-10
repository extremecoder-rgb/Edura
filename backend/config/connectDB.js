// make connection with database

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Error in connecting Database :- ", error);
  }
};

export default connectDB;
