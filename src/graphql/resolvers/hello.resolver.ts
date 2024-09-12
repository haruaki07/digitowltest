import { Resolvers } from "@/generated/types";

export const HelloResolver: Resolvers = {
  Query: {
    hello: (_, __, { req }) => {
      return `hello ${req.ip}!`;
    },
  },
};
