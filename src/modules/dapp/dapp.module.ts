import { MODULE } from "@core/app.symbols";
import { BaseModule } from "@core/infrastructure/di";
import { interfaces } from "inversify";
import { DappController } from "./dapp.controller";
import { DappMapper } from "./mappers/dapp.mapper";
import { IDappRepository } from "@core/domain/repositories";
import { DappRepositoryImpl } from "./dapp.impl.reposity";

export class DappModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.dappMapper(bind);
    this.dappRepositoryImpl(bind);
    this.dappController(bind);
  }

  private dappMapper(bind: interfaces.Bind): void {
    bind<DappMapper>(MODULE.DAPP_MAPPER).to(DappMapper);
  }

  private dappRepositoryImpl(bind: interfaces.Bind): void {
    bind<IDappRepository>(MODULE.DAPP_REPOSITORY_IMPL).to(DappRepositoryImpl);
  }

  private dappController(bind: interfaces.Bind): void {
    bind<DappController>(MODULE.DAPP_CONTROLLER).to(DappController);
  }
}
