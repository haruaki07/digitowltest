import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IOrderDataSource } from "@/Core/Common/Interfaces/IOrderDataSource";
import { IOrderRepository } from "@/Core/Common/Interfaces/IOrderRepository";
import { IUserDataSource } from "@/Core/Common/Interfaces/IUserDataSource";
import { IdOrderEntity } from "@/Domain/Entities/Order";
import { OrderItemEntity } from "@/Domain/Entities/OrderItem";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection,
    @inject(TYPES.IOrderDataSource)
    private readonly _orderDataSource: IOrderDataSource,
    @inject(TYPES.IUserDataSource)
    private readonly _userDataSource: IUserDataSource
  ) {}

  async findUserOrders(userId: string): Promise<IdOrderEntity[]> {
    const orders = await this._orderDataSource.findAll({ userId });

    return orders;
  }

  async findUserOrderById(
    userId: string,
    orderId: string
  ): Promise<IdOrderEntity> {
    const order = await this._orderDataSource.findById(userId, orderId);

    return order;
  }

  async createOrder(userId: string): Promise<IdOrderEntity> {
    const order = await this._mongoConn.withTransaction(async (session) => {
      const user = await this._userDataSource.findById(userId, { session });

      if (!user.cart.items.length) {
        throw new Error("Cart is empty");
      }

      const orderId = await this._orderDataSource.create(
        {
          userId,
          items: user.cart.items.map<OrderItemEntity>((item) => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
          totalPrice: user.cart.totalPrice,
          placedAt: new Date(),
        },
        { session }
      );

      await this._userDataSource.update(
        userId,
        { cart: { items: [], totalPrice: 0 } },
        {
          session,
        }
      );

      return await this._orderDataSource.findById(userId, orderId, {
        session,
      });
    });

    return order;
  }
}
