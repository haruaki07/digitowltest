import { DataSourceOptions } from "@/Domain/Common/DataSourceOptions";
import { IdProductEntity } from "@/Domain/Entities/Product";

export interface IProductDataSource {
  findById(id: string, options?: DataSourceOptions): Promise<IdProductEntity>;
  findAll(options?: DataSourceOptions): Promise<IdProductEntity[]>;
}
