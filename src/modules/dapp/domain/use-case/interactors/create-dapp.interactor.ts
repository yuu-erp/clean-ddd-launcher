import { inject, injectable } from "inversify";
import { DAPP_MODULE } from "src/app.symbols";
import { DappEntity } from "../../entities/dapp.entity";
import type { IDappRepository } from "../../repositories/dapp.repository";
import {
  CreateDappCommand,
  CreateDappInPort,
} from "../port/create-dapp.in-port";

@injectable()
export class CreateDappUseCase implements CreateDappInPort {
  constructor(
    @inject(DAPP_MODULE.DAPP_REPOSITORY_IMPL)
    private readonly dappRepository: IDappRepository
  ) {}
  execute(request: CreateDappCommand): DappEntity | Promise<DappEntity> {
    const dapp = DappEntity.create(request);
    return this.dappRepository.insert(dapp);
  }
}
