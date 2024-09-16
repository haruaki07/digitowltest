import { DataSourceOptions } from "@/Domain/Common/DataSourceOptions";
import { IdOrderEntity, OrderEntity } from "@/Domain/Entities/Order";

export interface IOrderDataSource {
  findBy(
    filter: Partial<IdOrderEntity>,
    options?: DataSourceOptions
  ): Promise<IdOrderEntity>;
  findAll(
    filter: Partial<IdOrderEntity>,
    options?: DataSourceOptions
  ): Promise<IdOrderEntity[]>;
  create(order: OrderEntity, options?: DataSourceOptions): Promise<string>;
}
