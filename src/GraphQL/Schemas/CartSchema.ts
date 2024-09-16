import gql from "graphql-tag";

export const CartSchema = gql`
  type Cart {
    items: [CartItem!]!
    totalPrice: Int!
  }

  type CartItem {
    product: Product!
    quantity: Int!
    totalPrice: Int!
  }

  extend type Query {
    cart: Cart!
  }

  extend type Mutation {
    addProductToCart(productId: ID!, quantity: Int!): Int!
    removeProductFromCart(productId: ID!): Int!
    updateCartItem(productId: ID!, quantity: Int!): Int!
  }
`;
