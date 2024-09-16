import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IOrderRepository } from "@/Core/Common/Interfaces/IOrderRepository";
import { IdOrderEntity, OrderEntity } from "@/Domain/Entities/Order";
import { TYPES } from "@/Infrastructure/DI";
import { injectable, inject } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection
  ) {}

  private getCollection() {
    return this._mongoConn.collection<OrderEntity>("orders");
  }

  async findUserOrders(userId: string): Promise<IdOrderEntity[]> {
    const orders = this.getCollection().find({ userId });

    return orders.toArray();
  }

  async findUserOrderById(
    userId: string,
    orderId: string
  ): Promise<IdOrderEntity> {
    const order = await this.getCollection().findOne({
      userId,
      _id: new ObjectId(orderId),
    });
    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  async createOrder(order: OrderEntity): Promise<string> {
    const { insertedId, acknowledged } = await this.getCollection().insertOne({
      ...order,
    });

    if (!acknowledged) {
      throw new Error("Failed to create order");
    }

    return insertedId.toString();
  }
}
