import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IUserDataSource } from "@/Core/Common/Interfaces/IUserDataSource";
import { DataSourceOptions } from "@/Domain/Common/DataSourceOptions";
import { IdUserEntity, UserEntity } from "@/Domain/Entities/User";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class UserDataSource implements IUserDataSource {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection
  ) {}

  private getCollection() {
    return this._mongoConn.collection<UserEntity>("users");
  }

  async findAll(options?: DataSourceOptions): Promise<IdUserEntity[]> {
    return await this.getCollection()
      .find({}, { session: options?.session })
      .map((user) => ({
        ...user,
        id: user._id.toString(),
        cart: {
          ...user.cart,
          items: user.cart.items.map((item) => ({
            ...item,
            product: { ...item.product, id: item.product._id.toString() },
          })),
        },
      }))
      .toArray();
  }

  async findById(
    id: string,
    options?: DataSourceOptions
  ): Promise<IdUserEntity> {
    const user = await this.getCollection().findOne(
      { _id: new ObjectId(id) },
      { session: options?.session }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,
      id: user._id.toString(),
      cart: {
        ...user.cart,
        items: user.cart.items.map((item) => ({
          ...item,
          product: { ...item.product, id: item.product._id.toString() },
        })),
      },
    };
  }

  async findByFirebaseId(
    firebaseId: string,
    options?: DataSourceOptions
  ): Promise<IdUserEntity> {
    const user = await this.getCollection().findOne(
      { firebaseId },
      { session: options?.session }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,
      id: user._id.toString(),
      cart: {
        ...user.cart,
        items: user.cart.items.map((item) => ({
          ...item,
          product: { ...item.product, id: item.product._id.toString() },
        })),
      },
    };
  }

  async create(user: UserEntity, options?: DataSourceOptions): Promise<string> {
    const { insertedId, acknowledged } = await this.getCollection().insertOne(
      user,
      { session: options?.session }
    );

    if (!acknowledged) {
      throw new Error("Failed to create user");
    }

    return insertedId.toString();
  }

  async update(
    id: string,
    user: Partial<UserEntity>,
    options?: DataSourceOptions
  ): Promise<IdUserEntity> {
    const res = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: user },
      { returnDocument: "after", session: options?.session }
    );

    if (!res) {
      throw new Error("Failed to update user");
    }

    return {
      ...res,
      id: res._id.toString(),
      cart: {
        ...res.cart,
        items: res.cart.items.map((item) => ({
          ...item,
          product: { ...item.product, id: item.product._id.toString() },
        })),
      },
    };
  }

  async delete(id: string, options?: DataSourceOptions): Promise<void> {
    const { acknowledged } = await this.getCollection().deleteOne(
      { _id: new ObjectId(id) },
      { session: options?.session }
    );

    if (!acknowledged) {
      throw new Error("Failed to delete user");
    }
  }
}
