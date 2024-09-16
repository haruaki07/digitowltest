import { IAuthDataSource } from "@/Core/Common/Interfaces/IAuthDataSource";
import { IFirebaseConnection } from "@/Core/Common/Interfaces/IFirebaseConnection";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class AuthDataSource implements IAuthDataSource {
  constructor(
    @inject(TYPES.IFirebaseConnection)
    private readonly _firebaseConn: IFirebaseConnection
  ) {}

  async verifyToken(token: string): Promise<string> {
    const payload = await this._firebaseConn.verifyIdToken(token);
    return payload.uid;
  }

  async signIn(email: string, password: string): Promise<string> {
    return this._firebaseConn.signInWithEmailAndPassword(email, password);
  }
}
