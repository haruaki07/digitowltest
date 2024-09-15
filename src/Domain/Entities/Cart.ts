import { CartItemEntity } from "./CartItem";

export class CartEntity {
  items!: CartItemEntity[];
  amount!: number;
}
