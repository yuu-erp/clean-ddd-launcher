import { inject, injectable } from "inversify";
import { LAYOUT_MODULE } from "src/app.symbols";
import { LayoutProps } from "../../entities/layout.type";
import type { ILayoutRepository } from "../../repositories/layout.repository";
import {
  CalculateLayoutCommand,
  CalculateLayoutInPort,
} from "../port/calculate-layout.in-port";

@injectable()
export class CalculateLayoutUseCase implements CalculateLayoutInPort {
  constructor(
    @inject(LAYOUT_MODULE.LAYOUT_REPOSITORY_IMPL)
    private readonly layoutRepository: ILayoutRepository
  ) {}

  execute(request: CalculateLayoutCommand): LayoutProps | Promise<LayoutProps> {
    return this.layoutRepository.insert(request);
  }
}
