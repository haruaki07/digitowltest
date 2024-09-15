import { User } from "@/Domain/Entities/User";

export interface IUserRepository {
  findUserByFirebaseId(firebaseId: string): Promise<User>;
  createUser(user: User): Promise<string>;
}
