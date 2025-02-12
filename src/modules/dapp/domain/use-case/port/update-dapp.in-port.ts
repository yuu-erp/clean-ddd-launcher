import { UseCase } from "@core/domain/use-cases.port.base";
import { DappProps } from "../../entities/dapp.type";
import { DappEntity } from "../../entities/dapp.entity";

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
