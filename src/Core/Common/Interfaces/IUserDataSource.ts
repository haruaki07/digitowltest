import { DataSourceOptions } from "@/Core/Common/Interfaces/DataSourceOptions";
import { UserRequestModel, UserResponseModel } from "@/Domain/Models/UserModel";

export interface IUserDataSource {
  findAll(options?: DataSourceOptions): Promise<UserResponseModel[]>;
  findById(id: string, options?: DataSourceOptions): Promise<UserResponseModel>;
  findByFirebaseId(
    firebaseId: string,
    options?: DataSourceOptions
  ): Promise<UserResponseModel>;
  create(user: UserRequestModel, options?: DataSourceOptions): Promise<string>;
  update(
    id: string,
    user: Partial<UserRequestModel>,
    options?: DataSourceOptions
  ): Promise<UserResponseModel>;
  delete(id: string, options?: DataSourceOptions): Promise<void>;
}
