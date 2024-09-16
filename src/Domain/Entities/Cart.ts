import { CartItemEntity } from "./CartItem";

export class CartEntity {
  items!: CartItemEntity[];
  totalPrice!: number;
}
