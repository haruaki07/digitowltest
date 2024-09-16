import { IOrderRepository } from "@/Core/Common/Interfaces/IOrderRepository";
import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { Order } from "@/GraphQL/generated/types";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.IOrderRepository)
    private readonly _orderRepository: IOrderRepository
  ) {}

  async execute(userId: string): Promise<Order> {
    const user = await this._userRepository.findUserById(userId);

    if (!user.cart.items.length) {
      throw new Error("Cart is empty");
    }

    const orderId = await this._orderRepository.createOrder({
      userId,
      products: user.cart.items.map((item) => ({
        ...item.product,
      })),
      totalPrice: user.cart.totalPrice,
      placedAt: new Date(),
    });

    const order = await this._orderRepository.findUserOrderById(
      userId,
      orderId
    );

    return {
      ...order,
      id: order._id.toString(),
      products: order.products.map((product) => ({
        ...product,
        id: product._id.toString(),
        name: product.name,
        price: product.price,
      })),
    };
  }
}
