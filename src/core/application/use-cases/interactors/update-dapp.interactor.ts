import { IDappRepository } from "@core/domain/repositories";
import {
  UpdateDappCommand,
  UpdateDappInPort,
} from "../port/update-dapp.in-port";
import { DappEntity } from "@core/domain/entities";
import { ArgumentNotProvidedException } from "@core/exceptions";

export class UpdateDappUseCase implements UpdateDappInPort {
  constructor(private readonly dappRepository: IDappRepository) {}

  execute(request: UpdateDappCommand): DappEntity {
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
