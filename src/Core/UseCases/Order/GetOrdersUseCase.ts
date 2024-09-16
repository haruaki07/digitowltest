import { IOrderRepository } from "@/Core/Common/Interfaces/IOrderRepository";
import { Order } from "@/GraphQL/generated/types";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class GetOrdersUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private readonly _orderRepository: IOrderRepository
  ) {}

  async execute(userId: string): Promise<Order[]> {
    const orders = await this._orderRepository.findUserOrders(userId);

    return orders.map((order) => ({
      ...order,
      id: order._id.toString(),
      products: order.products.map((product) => ({
        ...product,
        id: product._id.toString(),
        name: product.name,
        price: product.price,
      })),
    }));
  }
}
