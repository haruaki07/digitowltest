import { UseCases } from "@/Core/UseCases";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";

@injectable()
export class Context {
  userId!: string | null;

  @inject(TYPES.UseCases)
  useCases!: UseCases;
}
