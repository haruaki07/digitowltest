import { IUserDataSource } from "@/Core/Common/Interfaces/IUserDataSource";
import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { UserEntity } from "@/Domain/Entities/User";
import { TYPES } from "@/Infrastructure/DI/Types";
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.IUserDataSource)
    private readonly _userDataSource: IUserDataSource
  ) {}

  async findUserById(id: string): Promise<UserEntity> {
    return this._userDataSource.findById(id);
  }

  async findUserByFirebaseId(firebaseId: string): Promise<UserEntity> {
    return this._userDataSource.findByFirebaseId(firebaseId);
  }

  async createUser(user: UserEntity): Promise<string> {
    return this._userDataSource.create(user);
  }

  async updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    return this._userDataSource.update(id, user);
  }
}
