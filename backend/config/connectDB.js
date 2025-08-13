// make connection with database

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
    if (!mongoUri) {
      console.error("❌ No MongoDB connection string found in environment variables");
      console.error("Please set either MONGODB_URI or MONGODB_URL in your .env file");
      return;
    }
    
    await mongoose.connect(mongoUri);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error in connecting Database:", error);
  }
};

export default connectDB;
