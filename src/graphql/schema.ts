import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import { HelloResolver } from "./resolvers/hello.resolver";
import { HelloSchema } from "./schemas/hello.schema";

const BaseSchema = gql`
  type Query
`;

export const schema = makeExecutableSchema({
  typeDefs: [BaseSchema, HelloSchema],
  resolvers: [HelloResolver],
});
