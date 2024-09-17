import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IOrderDataSource } from "@/Core/Common/Interfaces/IOrderDataSource";
import { DataSourceOptions } from "@/Core/Common/Interfaces/DataSourceOptions";
import { IdOrderEntity, OrderEntity } from "@/Domain/Entities/Order";
import {
  OrderRequestModel,
  OrderResponseModel,
} from "@/Domain/Models/OrderModel";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class OrderDataSource implements IOrderDataSource {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection
  ) {}

  async findById(
    userId: string,
    id: string,
    options?: DataSourceOptions
  ): Promise<OrderResponseModel> {
    const order = await this._mongoConn.findOne<OrderEntity>(
      "orders",
      { _id: new ObjectId(id), userId },
      {
        session: options?.session,
      }
    );

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  async findAll(
    query: Partial<OrderRequestModel>,
    options?: DataSourceOptions
  ) {
    const orders = await this._mongoConn.find<OrderEntity>("orders", query, {
      session: options?.session,
    });

    return orders;
  }

  async create(
    order: OrderRequestModel,
    options?: DataSourceOptions
  ): Promise<string> {
    const id = await this._mongoConn.insertOne<OrderEntity>("orders", order, {
      session: options?.session,
    });

    if (!id) {
      throw new Error("Failed to create order");
    }

    return id.toString();
  }
}
