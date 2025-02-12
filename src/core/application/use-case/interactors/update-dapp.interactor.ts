import { MODULE } from "@core/app.symbols";
import { DappEntity } from "@core/domain/entities";
import type { IDappRepository } from "@core/domain/repositories";
import { inject, injectable } from "inversify";
import {
  UpdateDappCommand,
  UpdateDappInPort,
} from "../port/update-dapp.in-port";
import { ArgumentNotProvidedException } from "@core/exceptions";

@injectable()
export class UpdateDappUseCase implements UpdateDappInPort {
  constructor(
    @inject(MODULE.DAPP_REPOSITORY_IMPL)
    private readonly dappRepository: IDappRepository
  ) {}

  async execute(request: UpdateDappCommand): Promise<DappEntity> {
    const existingDapp = this.dappRepository.findById(request.id);
    if (!existingDapp) {
      throw new ArgumentNotProvidedException("Dapp not found");
    }
    const updatedProps = {
      ...existingDapp.getProps(),
      ...request.data, // Ghi đè các thuộc tính cần cập nhật
    };

    const updatedDapp = DappEntity.create(updatedProps);
    this.dappRepository.update(updatedDapp);
    return updatedDapp;
  }
}
