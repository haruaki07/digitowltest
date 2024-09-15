import { IdProductEntity } from "@/Domain/Entities/Product";

export interface IProductRepository {
  getProducts(): Promise<IdProductEntity[]>;
  findProductById(id: string): Promise<IdProductEntity>;
}
