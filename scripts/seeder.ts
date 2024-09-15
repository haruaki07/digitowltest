import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL!);

async function main() {
  console.log("Connecting to MongoDB...");
  await client.connect();

  console.log("Seeding products collection...");
  await client
    .db()
    .collection("products")
    .insertMany([
      {
        name: "Product 1",
        price: 100,
      },
      {
        name: "Product 2",
        price: 200,
      },
      {
        name: "Product 3",
        price: 150,
      },
    ]);

  console.log("Done.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => client.close());
