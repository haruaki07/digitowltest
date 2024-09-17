import gql from "graphql-tag";

export const OrderSchema = gql`
  type Order {
    id: ID!
    userId: ID!
    items: [OrderItem!]!
    totalPrice: Int!
    placedAt: DateTime!
  }

  type OrderItem {
    name: String!
    price: Int!
    quantity: Int!
  }

  extend type Query {
    orders: [Order!]!
    order(id: ID!): Order
  }

  extend type Mutation {
    createOrder: Order!
  }
`;
