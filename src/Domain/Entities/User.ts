import { CartEntity } from "./Cart";

export class UserEntity {
  firebaseId!: string;
  cart!: CartEntity;
}

export class IdUserEntity extends UserEntity {
  id!: string;
}
