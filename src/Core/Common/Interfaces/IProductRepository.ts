import { ProductResponseModel } from "@/Domain/Models/ProductModel";

export interface IProductRepository {
  getProducts(): Promise<ProductResponseModel[]>;
  findProductById(id: string): Promise<ProductResponseModel>;
}
