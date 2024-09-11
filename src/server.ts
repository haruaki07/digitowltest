import "dotenv/config";

import http from "node:http";
import express from "express";
import { config } from "./config";

async function main() {
  const app = express();

  const httpServer = http.createServer(app);

  app.get("/", (req, res) => res.json({ message: "hello world" }));

  await new Promise<void>((resolv) => {
    httpServer.listen({ port: config.port }, resolv);
  });

  console.log(`Server running on http://localhost:${config.port}`);
}

main().catch((e) => console.error(e));
