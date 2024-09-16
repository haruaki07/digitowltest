import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IProductDataSource } from "@/Core/Common/Interfaces/IProductDataSource";
import { DataSourceOptions } from "@/Domain/Common/DataSourceOptions";
import { IdProductEntity } from "@/Domain/Entities/Product";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class ProductDataSource implements IProductDataSource {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection
  ) {}

  private getCollection() {
    return this._mongoConn.collection<IdProductEntity>("products");
  }

  async findById(
    id: string,
    options?: DataSourceOptions
  ): Promise<IdProductEntity> {
    const product = await this.getCollection().findOne(
      { _id: new ObjectId(id) },
      { session: options?.session }
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      ...product,
      id: product._id.toString(),
    };
  }

  async findAll(options?: DataSourceOptions): Promise<IdProductEntity[]> {
    return await this.getCollection()
      .find({}, { session: options?.session })
      .map((product) => ({
        ...product,
        id: product._id.toString(),
      }))
      .toArray();
  }
}
