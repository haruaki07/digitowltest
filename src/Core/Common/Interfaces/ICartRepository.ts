import { CartEntity } from "@/Domain/Entities/Cart";

export interface ICartRepository {
  getCart(userId: string): Promise<CartEntity>;
  addProductToCart(
    userId: string,
    productId: string,
    qty: number
  ): Promise<number>;
  removeProductFromCart(userId: string, productId: string): Promise<number>;
  updateCartItem(
    userId: string,
    productId: string,
    qty: number
  ): Promise<number>;
}
