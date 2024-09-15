import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import { HelloResolver } from "./Resolvers/HelloResolver";
import { HelloSchema } from "./Schemas/HelloSchema";
import { ProductSchema } from "./Schemas/ProductSchema";
import { ProductResolver } from "./Resolvers/ProductResolver";

const BaseSchema = gql`
  type Query
`;

export const Schema = makeExecutableSchema({
  typeDefs: [BaseSchema, HelloSchema, ProductSchema],
  resolvers: [HelloResolver, ProductResolver],
});

export default Schema;
