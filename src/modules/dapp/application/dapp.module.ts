import { BaseModule } from "@core/infrastructure/di";
import { interfaces } from "inversify";
import { DappMapper } from "../infrastructure/dapp.mapper";
import { IDappRepository } from "../domain/repositories/dapp.repository";
import { DappRepositoryImpl } from "../infrastructure/dapp.impl.reposity";
import { DappController } from "./controllers/dapp.controller";
import { DAPP_MODULE } from "src/app.symbols";
import { CreateDappInPort } from "../domain/use-case/port/create-dapp.in-port";
import { CreateDappUseCase } from "../domain/use-case/interactors/create-dapp.interactor";
import { UpdateDappInPort } from "../domain/use-case/port/update-dapp.in-port";
import { UpdateDappUseCase } from "../domain/use-case/interactors/update-dapp.interactor";

export class DappModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.dappMapper(bind);
    this.dappRepositoryImpl(bind);
    this.dappController(bind);
    this.createDappUseCase(bind);
    this.updateDappUseCase(bind);
  }

  private dappMapper(bind: interfaces.Bind): void {
    bind<DappMapper>(DAPP_MODULE.DAPP_MAPPER).to(DappMapper);
  }
  private dappRepositoryImpl(bind: interfaces.Bind): void {
    bind<IDappRepository>(DAPP_MODULE.DAPP_REPOSITORY_IMPL).to(
      DappRepositoryImpl
    );
  }
  private createDappUseCase(bind: interfaces.Bind): void {
    bind<CreateDappInPort>(DAPP_MODULE.CREATE_DAPP_USECASE).to(
      CreateDappUseCase
    );
  }
  private updateDappUseCase(bind: interfaces.Bind): void {
    bind<UpdateDappInPort>(DAPP_MODULE.UPDATE_DAPP_USECASE).to(
      UpdateDappUseCase
    );
  }
  private dappController(bind: interfaces.Bind): void {
    bind<DappController>(DAPP_MODULE.DAPP_CONTROLLER).to(DappController);
  }
}
