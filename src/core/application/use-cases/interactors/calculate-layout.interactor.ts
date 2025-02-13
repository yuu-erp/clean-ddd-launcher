import { ILayoutRepository } from "@core/domain/repositories";
import {
  CalculateLayoutCommand,
  CalculateLayoutInPort,
} from "../port/calculate-layout.in-port";
import { LayoutProps } from "@core/domain/types";

export class CalculateLayoutUseCase implements CalculateLayoutInPort {
  constructor(private readonly layoutRepository: ILayoutRepository) {}

  execute(request: CalculateLayoutCommand): LayoutProps {
    return this.layoutRepository.insertLayout(request);
  }
}
