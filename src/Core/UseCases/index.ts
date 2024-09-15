import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { VerifyTokenUseCase } from "./VerifyTokenUseCase";
import { GetProductsUseCase } from "./Product/GetProductsUseCase";
import { GetProductUseCase } from "./Product/GetProductUseCase";

@injectable()
export class UseCases {
  @inject(TYPES.VerifyTokenUseCase)
  verifyTokenUseCase!: VerifyTokenUseCase;

  @inject(TYPES.GetProductsUseCase)
  getProductsUseCase!: GetProductsUseCase;

  @inject(TYPES.GetProductUseCase)
  getProductUseCase!: GetProductUseCase;
}
