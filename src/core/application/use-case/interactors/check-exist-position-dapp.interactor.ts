import { MODULE } from "@core/app.symbols";
import type { IDappRepository } from "@core/domain/repositories";
import { inject, injectable } from "inversify";
import {
  CheckExistPositionDappCommand,
  CheckExistPositionDappInPort,
} from "../port/check-exist-position-dapp.in-port";
import { DappEntity } from "@core/domain/entities";

@injectable()
export class CheckExistPositionDappUseCase
  implements CheckExistPositionDappInPort
{
  constructor(
    @inject(MODULE.DAPP_REPOSITORY_IMPL)
    private readonly dappRepository: IDappRepository
  ) {}
  execute(request: CheckExistPositionDappCommand): boolean | Promise<boolean> {
    const allDapp = this.dappRepository.findAll();
    const isPositionExist = allDapp.some((dapp: DappEntity) => {
      const dappPos = dapp.getProps().position.raw();
      const requestPosition = request.raw();
      return (
        requestPosition.x < dappPos.x + dappPos.width &&
        requestPosition.x + requestPosition.width > dappPos.x &&
        requestPosition.y < dappPos.y + dappPos.height &&
        requestPosition.y + requestPosition.height > dappPos.y
      );
    });
    return isPositionExist;
  }
}
