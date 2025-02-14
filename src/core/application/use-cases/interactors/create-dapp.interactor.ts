import { DappEntity } from "@core/domain/entities/dapp.entity";
import { IDappRepository } from "@core/domain/repositories/dapp.repository";
import {
  CreateDappCommand,
  CreateDappInPort,
} from "../port/create-dapp.in-port";

export class CreateDappUseCase implements CreateDappInPort {
  constructor(private readonly dappRepository: IDappRepository) {}
  execute(request: CreateDappCommand): DappEntity {
    const dapp = DappEntity.create(request);
    return this.dappRepository.insert(dapp);
  }
}
