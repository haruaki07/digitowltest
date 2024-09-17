import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IProductDataSource } from "@/Core/Common/Interfaces/IProductDataSource";
import { DataSourceOptions } from "@/Core/Common/Interfaces/DataSourceOptions";
import { IdProductEntity, ProductEntity } from "@/Domain/Entities/Product";
import { ProductResponseModel } from "@/Domain/Models/ProductModel";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class ProductDataSource implements IProductDataSource {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection
  ) {}

  async findById(
    id: string,
    options?: DataSourceOptions
  ): Promise<ProductResponseModel> {
    const product = await this._mongoConn.findOne<ProductEntity>(
      "products",
      {
        _id: new ObjectId(id),
      },
      { ...options }
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async findAll(options?: DataSourceOptions): Promise<ProductResponseModel[]> {
    return await this._mongoConn.find<ProductEntity>(
      "products",
      {},
      { ...options }
    );
  }
}
