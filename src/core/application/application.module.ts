import { BaseModule } from "@core/infrastructure/di";
import { interfaces } from "inversify";
import { CreateDappInPort } from "./use-case/port/create-dapp.in-port";
import { APPLICATION } from "@core/app.symbols";
import { CreateDappUseCase } from "./use-case/interactors/create-dapp.interactor";
import { CheckExistPositionDappInPort } from "./use-case/port/check-exist-position-dapp.in-port";
import { CheckExistPositionDappUseCase } from "./use-case/interactors/check-exist-position-dapp.interactor";
import { UpdateDappUseCase } from "./use-case/interactors/update-dapp.interactor";
import { UpdateDappInPort } from "./use-case/port/update-dapp.in-port";
import { MoveDappInPort } from "./use-case/port/move-dapp.in-port";
import { MoveDappUseCase } from "./use-case/interactors/move-dapp.interactor";

export class ApplicationModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.createDappUseCase(bind);
    this.checkExistPositionDappUseCase(bind);
    this.updateDappUseCase(bind);
    this.moveDappUseCase(bind);
  }

  private createDappUseCase(bind: interfaces.Bind): void {
    bind<CreateDappInPort>(APPLICATION.CREATE_DAPP_USECASE).to(
      CreateDappUseCase
    );
  }
  private checkExistPositionDappUseCase(bind: interfaces.Bind): void {
    bind<CheckExistPositionDappInPort>(
      APPLICATION.CHECK_EXIST_POSITION_DAPP_USECASE
    ).to(CheckExistPositionDappUseCase);
  }
  private updateDappUseCase(bind: interfaces.Bind): void {
    bind<UpdateDappInPort>(APPLICATION.UPDATE_DAPP_USECASE).to(
      UpdateDappUseCase
    );
  }
  private moveDappUseCase(bind: interfaces.Bind): void {
    bind<MoveDappInPort>(APPLICATION.MOVE_DAPP_USECASE).to(MoveDappUseCase);
  }
}
