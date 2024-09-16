import { CartItemRequestModel } from "@/Domain/Models/CartItem";
import { Resolvers } from "../generated/types";

export const CartResolver: Resolvers = {
  Query: {
    cart: async (_, __, { useCases, userId }) => {
      if (!userId) throw new Error("Unauthorized");

      return await useCases.getCartUseCase.execute(userId);
    },
  },
  Mutation: {
    addProductToCart: async (
      _,
      { productId, quantity },
      { userId, useCases }
    ) => {
      if (!userId) throw new Error("Unauthorized");

      return await useCases.addProductToCartUseCase.execute(
        new CartItemRequestModel({ productId, quantity, userId })
      );
    },
    removeProductFromCart: async (_, { productId }, { userId, useCases }) => {
      if (!userId) throw new Error("Unauthorized");

      return await useCases.removeProductFromCartUseCase.execute(
        userId,
        productId
      );
    },
    updateCartItem: async (
      _,
      { productId, quantity },
      { userId, useCases }
    ) => {
      if (!userId) throw new Error("Unauthorized");

      return await useCases.updateCartItemUseCase.execute(
        new CartItemRequestModel({ productId, quantity, userId })
      );
    },
  },
};
