import { ObjectId } from "mongodb";

export class ProductEntity {
  name!: string;
  price!: number;
}

export class IdProductEntity extends ProductEntity {
  _id!: ObjectId;
}
