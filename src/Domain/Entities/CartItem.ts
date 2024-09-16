import { IdProductEntity } from "./Product";

export class CartItemEntity {
  product!: IdProductEntity;
  quantity!: number;
  totalPrice!: number;
}
