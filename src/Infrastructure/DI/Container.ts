import { Container } from "inversify";
import { TYPES } from "./Types";
import { IFirebaseConnection } from "@/Core/Common/Interfaces/IFirebaseConnection";
import { FirebaseConnection } from "@/Infrastructure/Data/Connections/FirebaseConnection";
import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { MongoConnection } from "@/Infrastructure/Data/Connections/MongoConnection";
import { IAuthRepository } from "@/Core/Common/Interfaces/IAuthRepository";
import { AuthRepository } from "@/Infrastructure/Repositories/AuthRepository";
import { IUserRepository } from "@/Core/Common/Interfaces/IUserRepository";
import { UserRepository } from "@/Infrastructure/Repositories/UserRepository";
import { Context } from "@/GraphQL/Context";
import { UseCases } from "@/Core/UseCases";
import { ProductRepository } from "../Repositories/ProductRepository";
import { IProductRepository } from "@/Core/Common/Interfaces/IProductRepository";
import { VerifyTokenUseCase } from "@/Core/UseCases/Auth/VerifyTokenUseCase";
import { GetProductUseCase } from "@/Core/UseCases/Product/GetProductUseCase";
import { GetProductsUseCase } from "@/Core/UseCases/Product/GetProductsUseCase";
import { UpdateCartItemUseCase } from "@/Core/UseCases/Cart/UpdateCartItemUseCase";
import { RemoveProductFromCartUseCase } from "@/Core/UseCases/Cart/RemoveProductFromCartUseCase";
import { AddProductToCartUseCase } from "@/Core/UseCases/Cart/AddProductToCartUseCase";
import { GetCartUseCase } from "@/Core/UseCases/Cart/GetCartUseCase";
import { GetOrderUseCase } from "@/Core/UseCases/Order/GetOrderUseCase";
import { GetOrdersUseCase } from "@/Core/UseCases/Order/GetOrdersUseCase";
import { CreateOrderUseCase } from "@/Core/UseCases/Order/CreateOrderUseCase";
import { OrderRepository } from "../Repositories/OrderRepository";
import { IOrderRepository } from "@/Core/Common/Interfaces/IOrderRepository";
import { UserDataSource } from "../Data/DataSources/UserDataSource";
import { IUserDataSource } from "@/Core/Common/Interfaces/IUserDataSource";
import { AuthDataSource } from "../Data/DataSources/AuthDataSource";
import { IAuthDataSource } from "@/Core/Common/Interfaces/IAuthDataSource";
import { SignInUseCase } from "@/Core/UseCases/Auth/SignInUseCase";
import { ProductDataSource } from "../Data/DataSources/ProductDataSource";
import { IProductDataSource } from "@/Core/Common/Interfaces/IProductDataSource";
import { ICartRepository } from "@/Core/Common/Interfaces/ICartRepository";
import { CartRepository } from "../Repositories/CartRepository";
import { IOrderDataSource } from "@/Core/Common/Interfaces/IOrderDataSource";
import { OrderDataSource } from "../Data/DataSources/OrderDataSource";
import { config, Config } from "@/config";

const container = new Container();

container.bind<Config>(TYPES.Config).toConstantValue(config);
container.bind<Context>(TYPES.Context).to(Context);

// data connections
container
  .bind<IFirebaseConnection>(TYPES.IFirebaseConnection)
  .to(FirebaseConnection)
  .inSingletonScope();
container
  .bind<IMongoConnection>(TYPES.IMongoConnection)
  .to(MongoConnection)
  .inSingletonScope();

// data sources
container.bind<IUserDataSource>(TYPES.IUserDataSource).to(UserDataSource);
container.bind<IAuthDataSource>(TYPES.IAuthDataSource).to(AuthDataSource);
container
  .bind<IProductDataSource>(TYPES.IProductDataSource)
  .to(ProductDataSource);
container.bind<IOrderDataSource>(TYPES.IOrderDataSource).to(OrderDataSource);

// repositories
container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<IProductRepository>(TYPES.IProductRepository)
  .to(ProductRepository);
container.bind<IOrderRepository>(TYPES.IOrderRepository).to(OrderRepository);
container.bind<ICartRepository>(TYPES.ICartRepository).to(CartRepository);

// use cases
container.bind<UseCases>(TYPES.UseCases).to(UseCases);
container
  .bind<VerifyTokenUseCase>(TYPES.VerifyTokenUseCase)
  .to(VerifyTokenUseCase);
container.bind<SignInUseCase>(TYPES.SignInUseCase).to(SignInUseCase);
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
container
  .bind<CreateOrderUseCase>(TYPES.CreateOrderUseCase)
  .to(CreateOrderUseCase);
container.bind<GetOrdersUseCase>(TYPES.GetOrdersUseCase).to(GetOrdersUseCase);
container.bind<GetOrderUseCase>(TYPES.GetOrderUseCase).to(GetOrderUseCase);

export { container };
