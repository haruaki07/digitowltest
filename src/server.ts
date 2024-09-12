import "dotenv/config";

import http from "node:http";
import express from "express";
import { config } from "./config";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { schema } from "./graphql/schema";
import bodyParser from "body-parser";
import { Context } from "./graphql/context";

async function main() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res };
      },
    })
  );

  app.get("/", (req, res) => res.json({ message: "hello world" }));

  await new Promise<void>((resolv) => {
    httpServer.listen({ port: config.port }, resolv);
  });

  console.log(`Server running on http://localhost:${config.port}`);
}

main().catch((e) => console.error(e));
