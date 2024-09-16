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

    if (user.cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    if (
      !user.cart.items.find((item) => item.product._id.equals(data.productId))
    ) {
      throw new Error("Product not in cart");
    }

    user.cart.items = user.cart.items.map((item) => {
      if (item.product._id.equals(data.productId)) {
        item.quantity = data.quantity;
        item.totalPrice = data.quantity * item.product.price;
      }

      return item;
    });

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
