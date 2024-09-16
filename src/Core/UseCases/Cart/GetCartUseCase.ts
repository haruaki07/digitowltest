import { ICartRepository } from "@/Core/Common/Interfaces/ICartRepository";
import { Cart } from "@/GraphQL/generated/types";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class GetCartUseCase {
  constructor(
    @inject(TYPES.ICartRepository)
    private readonly _cartRepository: ICartRepository
  ) {}

  async execute(userId: string): Promise<Cart> {
    return await this._cartRepository.getCart(userId);
  }
}
