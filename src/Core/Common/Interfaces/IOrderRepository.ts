import { IdOrderEntity, OrderEntity } from "@/Domain/Entities/Order";

export interface IOrderRepository {
  findUserOrders(userId: string): Promise<IdOrderEntity[]>;
  createOrder(order: OrderEntity): Promise<string>;
  findUserOrderById(userId: string, orderId: string): Promise<IdOrderEntity>;
}
