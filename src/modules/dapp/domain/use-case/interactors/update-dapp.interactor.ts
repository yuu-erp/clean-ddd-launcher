import { ArgumentNotProvidedException } from "@core/exceptions";
import { inject, injectable } from "inversify";
import { DAPP_MODULE } from "src/app.symbols";
import { DappEntity } from "../../entities/dapp.entity";
import type { IDappRepository } from "../../repositories/dapp.repository";
import {
  UpdateDappCommand,
  UpdateDappInPort,
} from "../port/update-dapp.in-port";

@injectable()
export class UpdateDappUseCase implements UpdateDappInPort {
  constructor(
    @inject(DAPP_MODULE.DAPP_REPOSITORY_IMPL)
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
