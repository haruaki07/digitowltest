export class CartItemRequestModel {
  userId: string;
  productId: string;
  quantity: number;

  constructor(data: CartItemRequestModel) {
    this.userId = data.userId;
    this.productId = data.productId;
    this.quantity = data.quantity;

    if (this.quantity < 1) {
      throw new Error("Quantity must be greater than 0");
    }
  }
}
