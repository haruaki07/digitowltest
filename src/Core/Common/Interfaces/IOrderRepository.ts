import { IdOrderEntity, OrderEntity } from "@/Domain/Entities/Order";

export interface IOrderRepository {
  findUserOrders(userId: string): Promise<IdOrderEntity[]>;
  createOrder(userId: string): Promise<IdOrderEntity>;
  findUserOrderById(userId: string, orderId: string): Promise<IdOrderEntity>;
}
