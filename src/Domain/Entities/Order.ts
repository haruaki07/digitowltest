import { ObjectId } from "mongodb";
import { IdProductEntity } from "./Product";

export class OrderEntity {
  userId!: string;
  products!: IdProductEntity[];
  totalPrice!: number;
  placedAt!: Date;
}

export class IdOrderEntity extends OrderEntity {
  id!: string;
  _id!: ObjectId;
}
