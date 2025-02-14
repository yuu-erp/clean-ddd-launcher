import { DappEntity } from "@core/domain/entities/dapp.entity";
import { DappProps } from "@core/domain/types/dapp.type";
import { UseCase } from "@core/domain/use-cases.port.base";

export interface UpdateDappCommand {
  id: number;
  data: Partial<DappProps>;
}
export abstract class UpdateDappInPort
  implements UseCase<UpdateDappCommand, DappEntity | void>
{
  abstract execute(request: UpdateDappCommand): DappEntity;
}
