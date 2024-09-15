import { UserEntity } from "@/Domain/Entities/User";

export interface IUserRepository {
  findUserByFirebaseId(firebaseId: string): Promise<UserEntity>;
  createUser(user: UserEntity): Promise<string>;
}
