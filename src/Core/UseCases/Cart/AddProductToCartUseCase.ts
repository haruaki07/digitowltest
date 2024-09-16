import { ICartRepository } from "@/Core/Common/Interfaces/ICartRepository";
import { CartItemRequestModel } from "@/Domain/Models/CartItem";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class AddProductToCartUseCase {
  constructor(
    @inject(TYPES.ICartRepository)
    private readonly _cartRepository: ICartRepository
  ) {}

  async execute(data: CartItemRequestModel): Promise<number> {
    return await this._cartRepository.addProductToCart(
      data.userId,
      data.productId,
      data.quantity
    );
  }
}
