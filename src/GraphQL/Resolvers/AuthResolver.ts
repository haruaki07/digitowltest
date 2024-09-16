import { Resolvers } from "../generated/types";

export const AuthResolver: Resolvers = {
  Mutation: {
    signIn: async (_, { email, password }, { useCases, userId }) => {
      return await useCases.signInUseCase.execute(email, password);
    },
  },
};
