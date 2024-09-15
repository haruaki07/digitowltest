import { IAuthRepository } from "@/Core/Common/Interfaces/IAuthRepository";
import { IFirebaseConnection } from "@/Core/Common/Interfaces/IFirebaseConnection";
import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { User } from "@/Domain/Entities/User";
import { TYPES } from "@/Infrastructure/DI/Types";
import { inject, injectable } from "inversify";

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @inject(TYPES.IFirebaseConnection)
    private readonly _firebaseConn: IFirebaseConnection,
    @inject(TYPES.IMongoConnection)
    private readonly _dbConn: IMongoConnection
  ) {}

  async verifyToken(token: string): Promise<string> {
    const payload = await this._firebaseConn.verifyIdToken(token);

    const firebaseId = payload.uid;

    const user = await this._dbConn
      .collection<User>("users")
      .findOne({ firebaseId });
    if (user) {
      return user._id.toString();
    }

    const newUser = await this._dbConn.collection<User>("users").insertOne({
      firebaseId,
    });

    return newUser.insertedId.toString();
  }
}
