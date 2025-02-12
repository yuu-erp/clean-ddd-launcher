import { ILayout } from "@core/domain/types";
import { UseCase } from "@core/domain/use-cases.port.base";

export abstract class CalculateLayoutInPort
  implements UseCase<unknown, ILayout>
{
  abstract execute(): ILayout | Promise<ILayout>;
}
