import { IProductRepository } from "@/Core/Common/Interfaces/IProductRepository";
import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { CartItemRequestModel } from "@/Domain/Models/CartItem";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class AddProductToCartUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.IProductRepository)
    private readonly _productRepository: IProductRepository
  ) {}

  async execute(data: CartItemRequestModel): Promise<number> {
    const user = await this._userRepository.findUserById(data.userId);

    const product = await this._productRepository.findProductById(
      data.productId
    );

    if (user.cart.items.find((item) => item.product._id.equals(product._id))) {
      // update existing product quantity if already in cart
      user.cart.items = user.cart.items.map((item) => {
        if (item.product._id.equals(product._id)) {
          item.quantity += data.quantity;
          item.totalPrice = item.quantity * product.price;
        }

        return item;
      });
    } else {
      // else add it to cart
      user.cart.items.push({
        product,
        quantity: data.quantity,
        totalPrice: product.price * data.quantity,
      });
    }

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
