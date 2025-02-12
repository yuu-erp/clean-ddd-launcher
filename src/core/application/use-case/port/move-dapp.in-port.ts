import { DappEntity } from "@core/domain/entities";
import { UseCase } from "@core/domain/use-cases.port.base";
import { DappPosition } from "@core/domain/value-objects";

export interface MoveDappCommand {
  id: number;
  position: DappPosition;
  page?: number;
}
export abstract class MoveDappInPort
  implements UseCase<MoveDappCommand, DappEntity>
{
  abstract execute(
    request?: MoveDappCommand | undefined
  ): DappEntity | Promise<DappEntity>;
}
