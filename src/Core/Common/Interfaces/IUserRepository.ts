import { UserEntity } from "@/Domain/Entities/User";

export interface IUserRepository {
  findUserById(id: string): Promise<UserEntity>;
  findUserByFirebaseId(firebaseId: string): Promise<UserEntity>;
  createUser(user: UserEntity): Promise<string>;
  updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
}
