import { DappEntity } from "@core/domain/entities";
import { DappProps } from "@core/domain/types";
import { UseCase } from "@core/domain/use-cases.port.base";

export interface CreateDappCommand extends DappProps {}

export abstract class CreateDappInPort
  implements UseCase<CreateDappCommand, DappEntity>
{
  abstract execute(
    request: CreateDappCommand
  ): DappEntity | Promise<DappEntity>;
}
