import { inject, injectable } from "inversify";
import { CreateDappInPort } from "../../domain/use-case/port/create-dapp.in-port";
import { UpdateDappInPort } from "../../domain/use-case/port/update-dapp.in-port";
import { CreateDappDto } from "../dtos/create-dapp.dto";
import { UpdateDappDto } from "../dtos/update-dapp.dto";
import { DAPP_MODULE } from "src/app.symbols";

@injectable()
export class DappController {
  constructor(
    @inject(DAPP_MODULE.CREATE_DAPP_USECASE)
    private readonly createDappUseCase: CreateDappInPort,
    @inject(DAPP_MODULE.UPDATE_DAPP_USECASE)
    private readonly updateDappUseCase: UpdateDappInPort
  ) {}

  createDapp(body: CreateDappDto) {
    return this.createDappUseCase.execute(body);
  }
  updateDapp(body: UpdateDappDto) {
    return this.updateDappUseCase.execute(body);
  }
}
