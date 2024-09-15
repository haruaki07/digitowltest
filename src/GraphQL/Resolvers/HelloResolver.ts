import { Resolvers } from "@/GraphQL/generated/types";

export const HelloResolver: Resolvers = {
  Query: {
    hello: (_, __, { userId }) => {
      return `hello ${userId}!`;
    },
  },
};
