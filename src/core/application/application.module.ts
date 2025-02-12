import { BaseModule } from "@core/infrastructure/di";
import { interfaces } from "inversify";
import { CreateDappInPort } from "./use-case/port/create-dapp.in-port";
import { APPLICATION } from "@core/app.symbols";
import { CreateDappUseCase } from "./use-case/interactors/create-dapp.interactor";
import { UpdateDappUseCase } from "./use-case/interactors/update-dapp.interactor";
import { UpdateDappInPort } from "./use-case/port/update-dapp.in-port";
import { MoveDappInPort } from "./use-case/port/move-dapp.in-port";
import { MoveDappUseCase } from "./use-case/interactors/move-dapp.interactor";
import { CalculateLayoutInPort } from "./use-case/port/calculate-layout.in-port";
import { CalculateLayoutUseCase } from "./use-case/interactors/calculate-layout.interactor";

export class ApplicationModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.createDappUseCase(bind);
    this.updateDappUseCase(bind);
    this.moveDappUseCase(bind);

    this.calculateLayoutUseCase(bind);
  }

  private createDappUseCase(bind: interfaces.Bind): void {
    bind<CreateDappInPort>(APPLICATION.CREATE_DAPP_USECASE).to(
      CreateDappUseCase
    );
  }
  private updateDappUseCase(bind: interfaces.Bind): void {
    bind<UpdateDappInPort>(APPLICATION.UPDATE_DAPP_USECASE).to(
      UpdateDappUseCase
    );
  }
  private moveDappUseCase(bind: interfaces.Bind): void {
    bind<MoveDappInPort>(APPLICATION.MOVE_DAPP_USECASE).to(MoveDappUseCase);
  }

  private calculateLayoutUseCase(bind: interfaces.Bind): void {
    bind<CalculateLayoutInPort>(APPLICATION.CREATE_DAPP_USECASE).to(
      CalculateLayoutUseCase
    );
  }
}
