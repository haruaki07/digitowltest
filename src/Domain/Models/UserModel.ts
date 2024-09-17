import { CartEntity } from "../Entities/Cart";

export class UserRequestModel {
  firebaseId!: string;
  cart!: CartEntity;
}

export class UserResponseModel {
  id!: string;
  firebaseId!: string;
  cart!: CartEntity;
}
