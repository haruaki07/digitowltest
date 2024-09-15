import { IProductRepository } from "@/Core/Common/Interfaces/IProductRepository";
import { Product } from "@/GraphQL/generated/types";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class GetProductsUseCase {
  constructor(
    @inject(TYPES.IProductRepository)
    private readonly _productRepository: IProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this._productRepository.getProducts();

    return products.map((product) => ({
      id: product._id.toString(),
      ...product,
    }));
  }
}
