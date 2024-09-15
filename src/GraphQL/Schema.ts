import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import { HelloResolver } from "./Resolvers/HelloResolver";
import { HelloSchema } from "./Schemas/HelloSchema";

const BaseSchema = gql`
  type Query
`;

export const Schema = makeExecutableSchema({
  typeDefs: [BaseSchema, HelloSchema],
  resolvers: [HelloResolver],
});

export default Schema;
