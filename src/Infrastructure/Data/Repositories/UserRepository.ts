import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { User } from "@/Domain/Entities/User";
import { TYPES } from "@/Infrastructure/DI/Types";
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.IMongoConnection)
    private readonly _mongoConnection: IMongoConnection
  ) {}

  private getCollection() {
    return this._mongoConnection.collection<User>("users");
  }

  async findUserByFirebaseId(firebaseId: string): Promise<User> {
    const user = await this.getCollection().findOne({ firebaseId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async createUser(user: User): Promise<string> {
    const { insertedId, acknowledged } = await this.getCollection().insertOne(
      user
    );

    if (!acknowledged) {
      throw new Error("Failed to create user");
    }

    return insertedId.toString();
  }
}
