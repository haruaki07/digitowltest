import { ICartRepository } from "@/Core/Common/Interfaces/ICartRepository";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class RemoveProductFromCartUseCase {
  constructor(
    @inject(TYPES.ICartRepository)
    private readonly _cartRepository: ICartRepository
  ) {}

  async execute(userId: string, productId: string): Promise<number> {
    return await this._cartRepository.removeProductFromCart(userId, productId);
  }
}
