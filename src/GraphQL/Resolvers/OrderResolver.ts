import { UnauthorizedError } from "../Errors/UnauthorizedError";
import { Resolvers } from "../generated/types";

export const OrderResolver: Resolvers = {
  Query: {
    orders: async (_, __, { useCases, userId }) => {
      if (!userId) throw new UnauthorizedError();

      return await useCases.getOrdersUseCase.execute(userId);
    },
    order: async (_, { id }, { useCases, userId }) => {
      if (!userId) throw new UnauthorizedError();

      return await useCases.getOrderUseCase.execute(userId, id);
    },
  },
  Mutation: {
    createOrder: async (_, __, { useCases, userId }) => {
      if (!userId) throw new UnauthorizedError();

      return await useCases.createOrderUseCase.execute(userId);
    },
  },
};
