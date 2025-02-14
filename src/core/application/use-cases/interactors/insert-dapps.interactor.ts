import { IDappRepository } from "@core/domain/repositories";
import { InsertDappsInPort } from "../port/insert-dapps.in-port";
import { DappEntity } from "@core/domain/entities";

export class InsertDappsUseCase implements InsertDappsInPort {
  constructor(private readonly dappRepository: IDappRepository) {}

  execute(request: DappEntity[]): DappEntity[] {
    return this.dappRepository.insertMany(request);
  }
}
