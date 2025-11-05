// Filename: db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const client = new MongoClient(process.env.MONGODB_URI);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    return client.db("vectorDemoGemini");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}
