import gql from "graphql-tag";

export const ProductSchema = gql`
  type Product {
    id: ID!
    name: String!
    price: Int!
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`;
