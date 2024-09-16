import { IAuthRepository } from "@/Core/Common/Interfaces/IAuthRepository";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class SignInUseCase {
  constructor(
    @inject(TYPES.IAuthRepository)
    private readonly _authRepository: IAuthRepository
  ) {}

  async execute(email: string, password: string): Promise<string> {
    return await this._authRepository.signIn(email, password);
  }
}
