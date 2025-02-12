import { MODULE } from "@core/app.symbols";
import { DappEntity } from "@core/domain/entities";
import type { IDappRepository } from "@core/domain/repositories";
import { inject, injectable } from "inversify";
import { MoveDappCommand, MoveDappInPort } from "../port/move-dapp.in-port";
import { ArgumentNotProvidedException } from "@core/exceptions";

@injectable()
export class MoveDappUseCase implements MoveDappInPort {
  constructor(
    @inject(MODULE.DAPP_REPOSITORY_IMPL)
    private readonly dappRepository: IDappRepository
  ) {}

  async execute(request: MoveDappCommand): Promise<DappEntity> {
    const existingDapp = this.dappRepository.findById(request.id);
    if (!existingDapp) {
      throw new ArgumentNotProvidedException("Dapp not found");
    }

    // Cập nhật position và page (nếu có)
    const updatedProps = {
      ...existingDapp.getProps(),
      position: request.position,
      ...(request.page !== undefined && { page: request.page }),
    };

    const updatedDapp = DappEntity.create(updatedProps);
    this.dappRepository.update(updatedDapp);
    return updatedDapp;
  }
}
