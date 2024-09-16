import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { Cart } from "@/GraphQL/generated/types";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class GetCartUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<Cart> {
    const user = await this._userRepository.findUserById(userId);

    return {
      ...user.cart,
      items: user.cart.items.map((item) => ({
        ...item,
        product: { ...item.product, id: item.product._id.toString() },
      })),
    };
  }
}
