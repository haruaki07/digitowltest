import { ObjectId } from "mongodb";
import { IdProductEntity } from "./Product";

export interface OrderEntity {
  userId: string;
  products: IdProductEntity[];
  totalPrice: number;
  placedAt: Date;
}

export interface IdOrderEntity extends OrderEntity {
  _id: ObjectId;
}
