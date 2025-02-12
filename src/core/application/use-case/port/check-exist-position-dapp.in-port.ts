import { UseCase } from "@core/domain/use-cases.port.base";
import { DappPosition } from "@core/domain/value-objects";

export interface CheckExistPositionDappCommand extends DappPosition {}
export abstract class CheckExistPositionDappInPort
  implements UseCase<CheckExistPositionDappCommand, boolean>
{
  abstract execute(
    request: CheckExistPositionDappCommand
  ): boolean | Promise<boolean>;
}
