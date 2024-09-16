import { ObjectId } from "mongodb";

export class ProductEntity {
  name!: string;
  price!: number;
}

export class IdProductEntity extends ProductEntity {
  id!: string;
  _id!: ObjectId;
}
