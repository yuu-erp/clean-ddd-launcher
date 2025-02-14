import { DappEntity } from "@core/domain/entities";
import { UseCase } from "@core/domain/use-cases.port.base";

export abstract class GetDappsInPort implements UseCase<unknown, DappEntity[]> {
  abstract execute(): DappEntity[];
}
