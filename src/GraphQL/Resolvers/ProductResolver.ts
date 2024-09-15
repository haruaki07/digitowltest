import { UnauthorizedError } from "../Errors/UnauthorizedError";
import { Resolvers } from "../generated/types";

export const ProductResolver: Resolvers = {
  Query: {
    products: (_, __, { userId, useCases }) => {
      if (!userId) throw new UnauthorizedError();

      return useCases.getProductsUseCase.execute();
    },
    product: async (_, { id }, { userId, useCases }) => {
      if (!userId) throw new UnauthorizedError();

      return useCases.getProductUseCase.execute(id);
    },
  },
};
