import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { UserEntity } from "@/Domain/Entities/User";
import { TYPES } from "@/Infrastructure/DI/Types";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConnection: IMongoConnection
  ) {}

  private getCollection() {
    return this._mongoConnection.collection<UserEntity>("users");
  }

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.getCollection().findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async findUserByFirebaseId(firebaseId: string): Promise<UserEntity> {
    const user = await this.getCollection().findOne({ firebaseId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async createUser(user: UserEntity): Promise<string> {
    const { insertedId, acknowledged } = await this.getCollection().insertOne(
      user
    );

    if (!acknowledged) {
      throw new Error("Failed to create user");
    }

    return insertedId.toString();
  }

  async updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    const res = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: user },
      { returnDocument: "after" }
    );

    if (!res) {
      throw new Error("Failed to update user");
    }

    return res;
  }
}
