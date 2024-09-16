import gql from "graphql-tag";

export const OrderSchema = gql`
  type Order {
    id: ID!
    userId: ID!
    products: [Product!]!
    totalPrice: Int!
    placedAt: DateTime!
  }

  extend type Query {
    orders: [Order!]!
    order(id: ID!): Order
  }

  extend type Mutation {
    createOrder: Order!
  }
`;
