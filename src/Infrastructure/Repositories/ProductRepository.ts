import { IProductDataSource } from "@/Core/Common/Interfaces/IProductDataSource";
import { ProductResponseModel } from "@/Domain/Models/ProductModel";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class ProductRepository {
  constructor(
    @inject(TYPES.IProductDataSource)
    private readonly _productDataSource: IProductDataSource
  ) {}

  async getProducts(): Promise<ProductResponseModel[]> {
    const products = await this._productDataSource.findAll();

    return products;
  }

  async findProductById(id: string): Promise<ProductResponseModel> {
    const product = await this._productDataSource.findById(id);

    return product;
  }
}
