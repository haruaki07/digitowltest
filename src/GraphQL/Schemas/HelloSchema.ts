import gql from "graphql-tag";

export const HelloSchema = gql`
  extend type Query {
    hello: String!
  }
`;
