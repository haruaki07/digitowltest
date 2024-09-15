import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import { VerifyTokenUseCase } from "./VerifyTokenUseCase";

@injectable()
export class UseCases {
  @inject(TYPES.VerifyTokenUseCase)
  verifyTokenUseCase!: VerifyTokenUseCase;
}
