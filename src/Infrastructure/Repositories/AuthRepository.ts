import { IAuthDataSource } from "@/Core/Common/Interfaces/IAuthDataSource";
import { IAuthRepository } from "@/Core/Common/Interfaces/IAuthRepository";
import { IUserDataSource } from "@/Core/Common/Interfaces/IUserDataSource";
import { TYPES } from "@/Infrastructure/DI/Types";
import { inject, injectable } from "inversify";

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @inject(TYPES.IAuthDataSource)
    private readonly _authDataSource: IAuthDataSource,
    @inject(TYPES.IUserDataSource)
    private readonly _userDataSource: IUserDataSource
  ) {}

  async verifyToken(token: string): Promise<string> {
    const firebaseId = await this._authDataSource.verifyToken(token);

    let userId: string;
    try {
      const user = await this._userDataSource.findByFirebaseId(firebaseId);
      userId = user.id;
    } catch {
      // create if user is not exists in collection
      userId = await this._userDataSource.create({
        firebaseId,
        cart: {
          items: [],
          totalPrice: 0,
        },
      });
    }

    return userId;
  }

  async signIn(email: string, password: string): Promise<string> {
    return this._authDataSource.signIn(email, password);
  }
}
