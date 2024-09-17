export const TYPES = {
  Config: Symbol("Config"),
  Context: Symbol("Context"),

  IFirebaseConnection: Symbol("IFirebaseConnection"),
  IMongoConnection: Symbol("IMongoConnection"),

  IUserDataSource: Symbol("IUserDataSource"),
  IAuthDataSource: Symbol("IAuthDataSource"),
  IProductDataSource: Symbol("IProductDataSource"),
  IOrderDataSource: Symbol("IOrderDataSource"),

  IAuthRepository: Symbol("IAuthRepository"),
  IUserRepository: Symbol("IUserRepository"),
  IProductRepository: Symbol("IProductRepository"),
  IOrderRepository: Symbol("IOrderRepository"),
  ICartRepository: Symbol("ICartRepository"),

  UseCases: Symbol("UseCases"),

  VerifyTokenUseCase: Symbol("VerifyTokenUseCase"),
  SignInUseCase: Symbol("SignInUseCase"),

  GetProductsUseCase: Symbol("GetProductsUseCase"),
  GetProductUseCase: Symbol("GetProductUseCase"),

  GetCartUseCase: Symbol("GetCartUseCase"),
  AddProductToCartUseCase: Symbol("AddProductToCartUseCase"),
  RemoveProductFromCartUseCase: Symbol("RemoveProductFromCartUseCase"),
  UpdateCartItemUseCase: Symbol("UpdateCartItemUseCase"),

  CreateOrderUseCase: Symbol("CreateOrderUseCase"),
  GetOrdersUseCase: Symbol("GetOrdersUseCase"),
  GetOrderUseCase: Symbol("GetOrderUseCase"),
};
