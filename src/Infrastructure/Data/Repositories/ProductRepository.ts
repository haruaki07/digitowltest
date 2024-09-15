import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IdProductEntity } from "@/Domain/Entities/Product";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class ProductRepository {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _dbConn: IMongoConnection
  ) {}

  private getCollection() {
    return this._dbConn.collection<IdProductEntity>("products");
  }

  async getProducts() {
    return await this.getCollection().find().toArray();
  }

  async findProductById(id: string) {
    const product = await this.getCollection().findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}
