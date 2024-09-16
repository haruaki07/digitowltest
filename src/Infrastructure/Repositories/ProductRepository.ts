import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IProductDataSource } from "@/Core/Common/Interfaces/IProductDataSource";
import { IdProductEntity } from "@/Domain/Entities/Product";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class ProductRepository {
  constructor(
    @inject(TYPES.IProductDataSource)
    private readonly _productDataSource: IProductDataSource
  ) {}

  async getProducts(): Promise<IdProductEntity[]> {
    const products = await this._productDataSource.findAll();

    return products;
  }

  async findProductById(id: string) {
    const product = await this._productDataSource.findById(id);

    return product;
  }
}
