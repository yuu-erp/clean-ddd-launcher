import { ILayout } from "@core/domain/types";
import { CalculateLayoutInPort } from "../port/calculate-layout.in-port";
import { CalculateLayoutService } from "@core/domain/services";
import type { ILayoutRepository } from "@core/domain/repositories";
import { inject, injectable } from "inversify";
import { MODULE } from "@core/app.symbols";

@injectable()
export class CalculateLayout implements CalculateLayoutInPort {
  constructor(
    @inject(MODULE.DAPP_REPOSITORY_IMPL)
    private readonly layoutRepository: ILayoutRepository
  ) {}
  execute(): ILayout | Promise<ILayout> {
    const payload = CalculateLayoutService.calculateLayout();
    return this.layoutRepository.insert(payload);
  }
}
