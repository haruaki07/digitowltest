import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IUserDataSource } from "@/Core/Common/Interfaces/IUserDataSource";
import { DataSourceOptions } from "@/Core/Common/Interfaces/DataSourceOptions";
import { IdUserEntity, UserEntity } from "@/Domain/Entities/User";
import { UserResponseModel, UserRequestModel } from "@/Domain/Models/UserModel";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class UserDataSource implements IUserDataSource {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConn: IMongoConnection
  ) {}

  async findAll(options?: DataSourceOptions): Promise<UserResponseModel[]> {
    return await this._mongoConn.find<UserEntity>(
      "users",
      {},
      { session: options?.session }
    );
  }

  async findById(
    id: string,
    options?: DataSourceOptions
  ): Promise<UserResponseModel> {
    const user = await this._mongoConn.findOne<UserEntity>(
      "users",
      { _id: new ObjectId(id) },
      { session: options?.session }
    );

    if (!user) throw new Error("User not found");

    return user;
  }

  async findByFirebaseId(
    firebaseId: string,
    options?: DataSourceOptions
  ): Promise<UserResponseModel> {
    const user = await this._mongoConn.findOne<UserEntity>(
      "users",
      { firebaseId },
      { session: options?.session }
    );

    if (!user) throw new Error("User not found");

    return user;
  }

  async create(
    user: UserRequestModel,
    options?: DataSourceOptions
  ): Promise<string> {
    const id = await this._mongoConn.insertOne<UserEntity>("users", user, {
      session: options?.session,
    });
    if (!id) throw new Error("Failed to create user");

    return id.toString();
  }

  async update(
    id: string,
    user: Partial<UserRequestModel>,
    options?: DataSourceOptions
  ): Promise<UserResponseModel> {
    const res = await this._mongoConn.findAndUpdate<UserEntity>(
      "users",
      { _id: new ObjectId(id) },
      user,
      { session: options?.session }
    );
    if (!res) throw new Error("Failed to update user");

    return res;
  }

  async delete(id: string, options?: DataSourceOptions): Promise<void> {
    return await this._mongoConn.deleteOne(
      "users",
      { _id: new ObjectId(id) },
      {
        session: options?.session,
      }
    );
  }
}
