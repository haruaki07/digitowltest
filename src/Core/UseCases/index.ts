import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { VerifyTokenUseCase } from "./Auth/VerifyTokenUseCase";
import { GetProductsUseCase } from "./Product/GetProductsUseCase";
import { GetProductUseCase } from "./Product/GetProductUseCase";
import { AddProductToCartUseCase } from "./Cart/AddProductToCartUseCase";
import { RemoveProductFromCartUseCase } from "./Cart/RemoveProductFromCartUseCase";
import { UpdateCartItemUseCase } from "./Cart/UpdateCartItemUseCase";
import { GetCartUseCase } from "./Cart/GetCartUseCase";

@injectable()
export class UseCases {
  @inject(TYPES.VerifyTokenUseCase)
  verifyTokenUseCase!: VerifyTokenUseCase;

  @inject(TYPES.GetProductsUseCase)
  getProductsUseCase!: GetProductsUseCase;

  @inject(TYPES.GetProductUseCase)
  getProductUseCase!: GetProductUseCase;

  @inject(TYPES.GetCartUseCase)
  getCartUseCase!: GetCartUseCase;

  @inject(TYPES.AddProductToCartUseCase)
  addProductToCartUseCase!: AddProductToCartUseCase;

  @inject(TYPES.RemoveProductFromCartUseCase)
  removeProductFromCartUseCase!: RemoveProductFromCartUseCase;

  @inject(TYPES.UpdateCartItemUseCase)
  updateCartItemUseCase!: UpdateCartItemUseCase;
}
