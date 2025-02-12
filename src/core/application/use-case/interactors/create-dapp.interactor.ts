import { MODULE } from "@core/app.symbols";
import { DappEntity } from "@core/domain/entities";
import type { IDappRepository } from "@core/domain/repositories";
import { inject, injectable } from "inversify";
import {
  CreateDappCommand,
  CreateDappInPort,
} from "../port/create-dapp.in-port";

@injectable()
export class CreateDappUseCase implements CreateDappInPort {
  constructor(
    @inject(MODULE.DAPP_REPOSITORY_IMPL)
    private readonly dappRepository: IDappRepository
  ) {}
  execute(request: CreateDappCommand): DappEntity | Promise<DappEntity> {
    const dapp = DappEntity.create(request);
    return this.dappRepository.insert(dapp);
  }
}
