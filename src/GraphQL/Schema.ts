import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import { HelloResolver } from "./Resolvers/HelloResolver";
import { HelloSchema } from "./Schemas/HelloSchema";
import { ProductSchema } from "./Schemas/ProductSchema";
import { ProductResolver } from "./Resolvers/ProductResolver";
import { CartSchema } from "./Schemas/CartSchema";
import { CartResolver } from "./Resolvers/CartResolver";
import { OrderSchema } from "./Schemas/OrderSchema";
import { Resolvers } from "./generated/types";
import { OrderResolver } from "./Resolvers/OrderResolver";
import { AuthSchema } from "./Schemas/AuthSchema";
import { AuthResolver } from "./Resolvers/AuthResolver";

const BaseSchema = gql`
  type Query
  type Mutation
`;

const BaseResolver: Resolvers = {
  DateTime: DateTimeResolver,
};

export const Schema = makeExecutableSchema({
  typeDefs: [
    DateTimeTypeDefinition,
    BaseSchema,
    HelloSchema,
    ProductSchema,
    CartSchema,
    OrderSchema,
    AuthSchema,
  ],
  resolvers: [
    BaseResolver,
    HelloResolver,
    ProductResolver,
    CartResolver,
    OrderResolver,
    AuthResolver,
  ],
});

export default Schema;
