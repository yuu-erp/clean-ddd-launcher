import { DappEntity } from "@core/domain/entities";
import { UseCase } from "@core/domain/use-cases.port.base";
export abstract class InsertDappsInPort
  implements UseCase<DappEntity[], DappEntity[]>
{
  abstract execute(request: DappEntity[]): DappEntity[];
}
