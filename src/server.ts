import "reflect-metadata";
import "dotenv/config";

import http from "node:http";
import express from "express";
import { config } from "./config";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { Schema } from "./GraphQL/Schema";
import bodyParser from "body-parser";
import { Context } from "./GraphQL/Context";
import { container, TYPES } from "./Infrastructure/DI";
import { IMongoConnection } from "./Core/Common/Interfaces/IMongoConnection";

async function main() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema: Schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const mongoConnection = container.get<IMongoConnection>(
    TYPES.IMongoConnection
  );
  const context = container.get<Context>(TYPES.Context);

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        let userId: string | null = null;

        const token = req.headers.token;
        if (token) {
          userId = await context.useCases.verifyTokenUseCase.execute(
            token.toString()
          );
        }

        context.userId = userId;

        return { ...context };
      },
    })
  );

  app.get("/", (req, res) => res.json({ message: "hello world" }));

  await mongoConnection.connect();
  console.log(`Connected to MongoDB`);

  await new Promise<void>((resolv) => {
    httpServer.listen({ port: config.port }, resolv);
  });

  console.log(`Server running on http://localhost:${config.port}`);
}

main().catch((e) => console.error(e));
