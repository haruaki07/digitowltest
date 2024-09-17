import { OrderResponseModel } from "@/Domain/Models/OrderModel";

export interface IOrderRepository {
  findUserOrders(userId: string): Promise<OrderResponseModel[]>;
  createOrder(userId: string): Promise<OrderResponseModel>;
  findUserOrderById(
    userId: string,
    orderId: string
  ): Promise<OrderResponseModel>;
}
