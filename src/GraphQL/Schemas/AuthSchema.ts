import gql from "graphql-tag";

export const AuthSchema = gql`
  extend type Mutation {
    signIn(email: String!, password: String!): String!
  }
`;
