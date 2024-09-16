export const TYPES = {
  Context: Symbol("Context"),

  IFirebaseConnection: Symbol("IFirebaseConnection"),
  IMongoConnection: Symbol("IMongoConnection"),

  IAuthRepository: Symbol("IAuthRepository"),
  IUserRepository: Symbol("IUserRepository"),
  IProductRepository: Symbol("IProductRepository"),

  UseCases: Symbol("UseCases"),

  VerifyTokenUseCase: Symbol("VerifyTokenUseCase"),

  GetProductsUseCase: Symbol("GetProductsUseCase"),
  GetProductUseCase: Symbol("GetProductUseCase"),

  GetCartUseCase: Symbol("GetCartUseCase"),
  AddProductToCartUseCase: Symbol("AddProductToCartUseCase"),
  RemoveProductFromCartUseCase: Symbol("RemoveProductFromCartUseCase"),
  UpdateCartItemUseCase: Symbol("UpdateCartItemUseCase"),
};
