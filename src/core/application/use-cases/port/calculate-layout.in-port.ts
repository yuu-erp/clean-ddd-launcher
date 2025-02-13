import { LayoutProps } from "@core/domain/types";
import { UseCase } from "@core/domain/use-cases.port.base";
export interface CalculateLayoutCommand extends LayoutProps {}

export abstract class CalculateLayoutInPort
  implements UseCase<CalculateLayoutCommand, LayoutProps>
{
  abstract execute(request: CalculateLayoutCommand): LayoutProps;
}
