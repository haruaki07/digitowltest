import { IOrderRepository } from "@/Core/Common/Interfaces/IOrderRepository";
import { Order } from "@/GraphQL/generated/types";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class GetOrderUseCase {
  constructor(
    @inject(TYPES.IOrderRepository)
    private readonly _orderRepository: IOrderRepository
  ) {}

  async execute(userId: string, orderId: string): Promise<Order> {
    return await this._orderRepository.findUserOrderById(userId, orderId);
  }
}
