import { IProductRepository } from "@/Core/Common/Interfaces/IProductRepository";
import { Product } from "@/GraphQL/generated/types";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class GetProductUseCase {
  constructor(
    @inject(TYPES.IProductRepository)
    private readonly _productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<Product> {
    return await this._productRepository.findProductById(id);
  }
}
