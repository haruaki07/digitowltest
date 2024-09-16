import { DataSourceOptions } from "@/Domain/Common/DataSourceOptions";
import { IdUserEntity, UserEntity } from "@/Domain/Entities/User";

export interface IUserDataSource {
  findAll(options?: DataSourceOptions): Promise<IdUserEntity[]>;
  findById(id: string, options?: DataSourceOptions): Promise<IdUserEntity>;
  findByFirebaseId(
    firebaseId: string,
    options?: DataSourceOptions
  ): Promise<IdUserEntity>;
  create(user: UserEntity, options?: DataSourceOptions): Promise<string>;
  update(
    id: string,
    user: Partial<UserEntity>,
    options?: DataSourceOptions
  ): Promise<IdUserEntity>;
  delete(id: string, options?: DataSourceOptions): Promise<void>;
}
