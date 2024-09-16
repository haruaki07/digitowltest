import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IOrderDataSource } from "@/Core/Common/Interfaces/IOrderDataSource";
import { DataSourceOptions } from "@/Domain/Common/DataSourceOptions";
import { IdOrderEntity, OrderEntity } from "@/Domain/Entities/Order";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class OrderDataSource implements IOrderDataSource {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection
  ) {}

  private getCollection() {
    return this._mongoConn.collection<OrderEntity>("orders");
  }

  async findBy(
    filter: Partial<OrderEntity>,
    options?: DataSourceOptions
  ): Promise<IdOrderEntity> {
    const order = await this.getCollection().findOne(filter, {
      session: options?.session,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return {
      ...order,
      id: order._id.toString(),
      products: order.products.map((product) => ({
        ...product,
        id: product._id.toString(),
      })),
    };
  }

  async findAll(
    filter: Partial<OrderEntity> = {},
    options?: DataSourceOptions
  ) {
    const orders = await this.getCollection()
      .find(filter, { session: options?.session })
      .toArray();

    return orders.map((order) => ({
      ...order,
      id: order._id.toString(),
      products: order.products.map((product) => ({
        ...product,
        id: product._id.toString(),
      })),
    }));
  }

  async create(
    order: OrderEntity,
    options?: DataSourceOptions
  ): Promise<string> {
    const { insertedId, acknowledged } = await this.getCollection().insertOne(
      order,
      { session: options?.session }
    );

    if (!acknowledged) {
      throw new Error("Failed to create order");
    }

    return insertedId.toString();
  }
}
