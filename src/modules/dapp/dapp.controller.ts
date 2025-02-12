import { CreateDappInPort } from "@core/application/use-case/port/create-dapp.in-port";
import type {
  CheckExistPositonDto,
  CreateDappDto,
  MoveDappDto,
  UpdateDappDto,
} from "./dtos/payload.dto";
import { inject, injectable } from "inversify";
import { APPLICATION } from "@core/app.symbols";
import { CheckExistPositionDappInPort } from "@core/application/use-case/port/check-exist-position-dapp.in-port";
import { UpdateDappInPort } from "@core/application/use-case/port/update-dapp.in-port";
import { MoveDappInPort } from "@core/application/use-case/port/move-dapp.in-port";

@injectable()
export class DappController {
  constructor(
    @inject(APPLICATION.CREATE_DAPP_USECASE)
    private readonly createDappUseCase: CreateDappInPort,
    @inject(APPLICATION.CHECK_EXIST_POSITION_DAPP_USECASE)
    private readonly checkExistPositionDappUseCase: CheckExistPositionDappInPort,
    @inject(APPLICATION.UPDATE_DAPP_USECASE)
    private readonly updateDappUseCase: UpdateDappInPort,
    @inject(APPLICATION.MOVE_DAPP_USECASE)
    private readonly moveDappUseCase: MoveDappInPort
  ) {}

  createDapp(payload: CreateDappDto) {
    return this.createDappUseCase.execute(payload);
  }

  checkExistDapp(payload: CheckExistPositonDto) {
    return this.checkExistPositionDappUseCase.execute(payload);
  }

  updateDapp(payload: UpdateDappDto) {
    return this.updateDappUseCase.execute(payload);
  }

  moveDapp(payload: MoveDappDto) {
    return this.moveDappUseCase.execute(payload);
  }
}
