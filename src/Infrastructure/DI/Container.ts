import { Container } from "inversify";
import { TYPES } from "./Types";
import { IFirebaseConnection } from "@/Core/Common/Interfaces/IFirebaseConnection";
import { FirebaseConnection } from "@/Infrastructure/Data/Connections/FirebaseConnection";
import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { MongoConnection } from "@/Infrastructure/Data/Connections/MongoConnection";
import { IAuthRepository } from "@/Core/Common/Interfaces/IAuthRepository";
import { AuthRepository } from "@/Infrastructure/Data/Repositories/AuthRepository";
import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { UserRepository } from "@/Infrastructure/Data/Repositories/UserRepository";
import { Context } from "@/GraphQL/Context";
import { UseCases } from "@/Core/UseCases";
import { ProductRepository } from "../Data/Repositories/ProductRepository";
import { IProductRepository } from "@/Core/Common/Interfaces/IProductRepository";
import { VerifyTokenUseCase } from "@/Core/UseCases/Auth/VerifyTokenUseCase";
import { GetProductUseCase } from "@/Core/UseCases/Product/GetProductUseCase";
import { GetProductsUseCase } from "@/Core/UseCases/Product/GetProductsUseCase";
import { UpdateCartItemUseCase } from "@/Core/UseCases/Cart/UpdateCartItemUseCase";
import { RemoveProductFromCartUseCase } from "@/Core/UseCases/Cart/RemoveProductFromCartUseCase";
import { AddProductToCartUseCase } from "@/Core/UseCases/Cart/AddProductToCartUseCase";
import { GetCartUseCase } from "@/Core/UseCases/Cart/GetCartUseCase";

const container = new Container();

container.bind<Context>(TYPES.Context).to(Context);

// data connections
container
  .bind<IFirebaseConnection>(TYPES.IFirebaseConnection)
  .to(FirebaseConnection);
container.bind<IMongoConnection>(TYPES.IMongoConnection).to(MongoConnection);

// repositories
container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<IProductRepository>(TYPES.IProductRepository)
  .to(ProductRepository);

// use cases
container.bind<UseCases>(TYPES.UseCases).to(UseCases);
container
  .bind<VerifyTokenUseCase>(TYPES.VerifyTokenUseCase)
  .to(VerifyTokenUseCase);
container
  .bind<GetProductsUseCase>(TYPES.GetProductsUseCase)
  .to(GetProductsUseCase);
container
  .bind<GetProductUseCase>(TYPES.GetProductUseCase)
  .to(GetProductUseCase);
container.bind<GetCartUseCase>(TYPES.GetCartUseCase).to(GetCartUseCase);
container
  .bind<AddProductToCartUseCase>(TYPES.AddProductToCartUseCase)
  .to(AddProductToCartUseCase);
container
  .bind<RemoveProductFromCartUseCase>(TYPES.RemoveProductFromCartUseCase)
  .to(RemoveProductFromCartUseCase);
container
  .bind<UpdateCartItemUseCase>(TYPES.UpdateCartItemUseCase)
  .to(UpdateCartItemUseCase);

export { container };
