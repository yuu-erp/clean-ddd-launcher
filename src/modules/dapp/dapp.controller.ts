import { APPLICATION } from "@core/app.symbols";
import { CreateDappInPort } from "@core/application/use-case/port/create-dapp.in-port";
import { MoveDappInPort } from "@core/application/use-case/port/move-dapp.in-port";
import { UpdateDappInPort } from "@core/application/use-case/port/update-dapp.in-port";
import { inject, injectable } from "inversify";
import type {
  CreateDappDto,
  MoveDappDto,
  UpdateDappDto,
} from "./dtos/payload.dto";

@injectable()
export class DappController {
  constructor(
    @inject(APPLICATION.CREATE_DAPP_USECASE)
    private readonly createDappUseCase: CreateDappInPort,
    @inject(APPLICATION.UPDATE_DAPP_USECASE)
    private readonly updateDappUseCase: UpdateDappInPort,
    @inject(APPLICATION.MOVE_DAPP_USECASE)
    private readonly moveDappUseCase: MoveDappInPort
  ) {}

  createDapp(payload: CreateDappDto) {
    return this.createDappUseCase.execute(payload);
  }

  updateDapp(payload: UpdateDappDto) {
    return this.updateDappUseCase.execute(payload);
  }

  moveDapp(payload: MoveDappDto) {
    return this.moveDappUseCase.execute(payload);
  }
}
