import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { CartItemRequestModel } from "@/Domain/Models/CartItem";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateCartItemUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(data: CartItemRequestModel): Promise<number> {
    const user = await this._userRepository.findUserById(data.userId);

    const product = user.cart.items.find(
      (item) => item.product._id.toString() === data.productId
    );

    if (!product) {
      throw new Error("Product not in cart");
    }

    product.quantity = data.quantity;
    product.totalPrice = product.quantity * product.product.price;

    user.cart.totalPrice = user.cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // update user cart
    const { cart } = await this._userRepository.updateUser(data.userId, {
      cart: user.cart,
    });

    return cart.items.length;
  }
}
