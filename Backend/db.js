import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log(process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected!");
    console.log(conn.connection.host);
  } catch (error) {
    console.log("❌ FULL ERROR:");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;