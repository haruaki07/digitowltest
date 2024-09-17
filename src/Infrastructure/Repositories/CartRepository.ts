import { ICartRepository } from "@/Core/Common/Interfaces/ICartRepository";
import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IProductDataSource } from "@/Core/Common/Interfaces/IProductDataSource";
import { IUserDataSource } from "@/Core/Common/Interfaces/IUserDataSource";
import { CartEntity } from "@/Domain/Entities/Cart";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection,
    @inject(TYPES.IProductDataSource)
    private readonly _productDataSource: IProductDataSource,
    @inject(TYPES.IUserDataSource)
    private readonly _userDataSource: IUserDataSource
  ) {}

  async getCart(userId: string): Promise<CartEntity> {
    const user = await this._userDataSource.findById(userId);

    return user.cart;
  }

  async addProductToCart(
    userId: string,
    productId: string,
    qty: number
  ): Promise<number> {
    const cartItemsLength = await this._mongoConn.withTransaction(
      async (session) => {
        const user = await this._userDataSource.findById(userId, { session });
        const product = await this._productDataSource.findById(productId, {
          session,
        });

        if (user.cart.items.find((item) => item.product.id === product.id)) {
          // update existing product quantity if already in cart
          user.cart.items = user.cart.items.map((item) => {
            if (item.product.id === product.id) {
              item.quantity += qty;
              item.totalPrice = item.quantity * product.price;
            }

            return item;
          });
        } else {
          // else add it to cart
          user.cart.items.push({
            product,
            quantity: qty,
            totalPrice: product.price,
          });
        }

        // update cart total price
        user.cart.totalPrice = user.cart.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );

        // update user cart
        const { cart } = await this._userDataSource.update(
          userId,
          { cart: user.cart },
          { session }
        );

        return cart.items.length;
      }
    );

    return cartItemsLength;
  }

  async removeProductFromCart(
    userId: string,
    productId: string
  ): Promise<number> {
    const cartItemsLength = await this._mongoConn.withTransaction(
      async (session) => {
        const user = await this._userDataSource.findById(userId, { session });
        const product = await this._productDataSource.findById(productId, {
          session,
        });

        // check if product not in cart
        if (!user.cart.items.find((item) => item.product.id === product.id)) {
          throw new Error("Product not in cart");
        }

        user.cart.items = user.cart.items.filter(
          (item) => item.product.id !== product.id
        );

        // recalculate cart total price
        user.cart.totalPrice = user.cart.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );

        // update user cart
        const { cart } = await this._userDataSource.update(
          userId,
          { cart: user.cart },
          { session }
        );

        return cart.items.length;
      }
    );

    return cartItemsLength;
  }

  async updateCartItem(
    userId: string,
    productId: string,
    qty: number
  ): Promise<number> {
    const cartItemsLength = await this._mongoConn.withTransaction(
      async (session) => {
        const user = await this._userDataSource.findById(userId, { session });
        const product = await this._productDataSource.findById(productId, {
          session,
        });

        if (!user.cart.items.find((item) => item.product.id === product.id)) {
          throw new Error("Product not in cart");
        }

        user.cart.items = user.cart.items.map((item) => {
          if (item.product.id === product.id) {
            item.quantity = qty;
            item.totalPrice = item.quantity * product.price;
          }

          return item;
        });

        // recalculate cart total price
        user.cart.totalPrice = user.cart.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );

        // update user cart
        const { cart } = await this._userDataSource.update(
          userId,
          { cart: user.cart },
          { session }
        );

        return cart.items.length;
      }
    );

    return cartItemsLength;
  }
}
