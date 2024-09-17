import { DataSourceOptions } from "@/Core/Common/Interfaces/DataSourceOptions";
import { ProductResponseModel } from "@/Domain/Models/ProductModel";

export interface IProductDataSource {
  findById(
    id: string,
    options?: DataSourceOptions
  ): Promise<ProductResponseModel>;
  findAll(options?: DataSourceOptions): Promise<ProductResponseModel[]>;
}
