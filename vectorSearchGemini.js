import { connectDB } from "./db.js";
import { getEmbedding } from "./getEmbeddingGemini.js";

async function run() {
  const db = await connectDB();
  const coll = db.collection("products");

  const query = "Headphones with long battery backup";
  const queryEmbedding = await getEmbedding(query);

  const results = await coll.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 5
      }
    },
    {
      $project: { name: 1, description: 1, score: { $meta: "vectorSearchScore" } }
    }
  ]).toArray();

  console.log("🔍 Search results:");
  results.forEach((r, i) =>
    console.log(`${i + 1}. ${r.name} (score: ${(r.score || 0).toFixed(4)})`)
  );

  process.exit(0);
}

run().catch(console.error);
