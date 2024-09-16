import { IProductRepository } from "@/Core/Common/Interfaces/IProductRepository";
import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class RemoveProductFromCartUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.IProductRepository)
    private readonly _productRepository: IProductRepository
  ) {}

  async execute(userId: string, productId: string): Promise<number> {
    const user = await this._userRepository.findUserById(userId);

    // product not in cart
    if (!user.cart.items.find((item) => item.product._id.equals(productId))) {
      throw new Error("Product not in cart");
    }

    user.cart.items = user.cart.items.filter(
      (item) => !item.product._id.equals(productId)
    );

    user.cart.totalPrice = user.cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // update user cart
    const { cart } = await this._userRepository.updateUser(userId, {
      cart: user.cart,
    });

    return cart.items.length;
  }
}
