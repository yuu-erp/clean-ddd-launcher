import { DappEntity } from "@core/domain/entities";
import { DappProps } from "@core/domain/types";
import { UseCase } from "@core/domain/use-cases.port.base";

export interface UpdateDappCommand {
  id: number;
  data: Partial<DappProps>;
}
export abstract class UpdateDappInPort
  implements UseCase<UpdateDappCommand, DappEntity>
{
  abstract execute(
    request: UpdateDappCommand
  ): DappEntity | Promise<DappEntity>;
}
