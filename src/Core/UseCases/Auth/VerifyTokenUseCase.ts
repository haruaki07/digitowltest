import { TYPES } from "@/Infrastructure/DI/Types";
import { inject, injectable } from "inversify";
import { IAuthRepository } from "../../Common/Interfaces/IAuthRepository";

@injectable()
export class VerifyTokenUseCase {
  constructor(
    @inject(TYPES.IAuthRepository)
    private readonly _authRepository: IAuthRepository
  ) {}

  async execute(token: string): Promise<string> {
    return await this._authRepository.verifyToken(token);
  }
}
