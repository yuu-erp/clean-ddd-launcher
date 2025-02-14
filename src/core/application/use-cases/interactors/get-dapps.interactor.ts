import { DappEntity } from "@core/domain/entities";
import { IDappRepository } from "@core/domain/repositories";
import { GetDappsInPort } from "../port/get-dapps.in-port";

export class GetDappsUseCase implements GetDappsInPort {
  constructor(private readonly dappRepository: IDappRepository) {}
  execute(): DappEntity[] {
    return this.dappRepository.findAll();
  }
}
