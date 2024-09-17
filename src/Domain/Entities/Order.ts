import { OrderItemEntity } from "./OrderItem";

export class OrderEntity {
  userId!: string;
  items!: OrderItemEntity[];
  totalPrice!: number;
  placedAt!: Date;
}

export class IdOrderEntity extends OrderEntity {
  id!: string;
}
