import { ProductEntity } from "./Product";

export class CartItemEntity {
  product!: ProductEntity;
  quantity!: number;
  totalPrice!: number;
}
