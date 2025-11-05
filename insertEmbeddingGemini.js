// Filename: insertEmbeddingGemini.js
import { connectDB } from "./db.js";
import { getEmbedding } from "./getEmbeddingGemini.js";

async function run() {
  const db = await connectDB();
  const coll = db.collection("products");

  const text = "Wireless noise-cancelling headphones with 40-hour battery life";
  console.log("Generating embedding using Gemini API...");

  const embedding = await getEmbedding(text);

  await coll.insertOne({
    name: "Noise Cancelling Headphones",
    description: text,
    embedding: embedding,
    createdAt: new Date(),
  });

  console.log(`✅ Document inserted (embedding length: ${embedding.length})`);
  process.exit(0);
}

run().catch(console.error);
