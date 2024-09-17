import { DataSourceOptions } from "@/Core/Common/Interfaces/DataSourceOptions";
import {
  OrderRequestModel,
  OrderResponseModel,
} from "@/Domain/Models/OrderModel";

export interface IOrderDataSource {
  findById(
    userId: string,
    id: string,
    options?: DataSourceOptions
  ): Promise<OrderResponseModel>;
  findAll(
    query: Partial<OrderRequestModel>,
    options?: DataSourceOptions
  ): Promise<OrderResponseModel[]>;
  create(
    order: OrderRequestModel,
    options?: DataSourceOptions
  ): Promise<string>;
}
