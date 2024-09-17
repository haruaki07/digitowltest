import { OrderItemEntity } from "../Entities/OrderItem";

export class OrderResponseModel {
  id!: string;
  items!: OrderItemEntity[];
  userId!: string;
  totalPrice!: number;
  placedAt!: Date;
}

export class OrderRequestModel {
  userId!: string;
  totalPrice!: number;
  placedAt!: Date;
  items!: OrderItemEntity[];
}
