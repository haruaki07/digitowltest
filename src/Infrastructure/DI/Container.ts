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
import { VerifyTokenUseCase } from "@/Core/UseCases/VerifyTokenUseCase";
import { UseCases } from "@/Core/UseCases";

const container = new Container();

container.bind<Context>(TYPES.Context).to(Context);

container
  .bind<IFirebaseConnection>(TYPES.IFirebaseConnection)
  .to(FirebaseConnection);
container.bind<IMongoConnection>(TYPES.IMongoConnection).to(MongoConnection);
container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

// use cases
container.bind<UseCases>(TYPES.UseCases).to(UseCases);
container
  .bind<VerifyTokenUseCase>(TYPES.VerifyTokenUseCase)
  .to(VerifyTokenUseCase);

export { container };
