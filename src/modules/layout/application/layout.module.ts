import { BaseModule } from "@core/infrastructure/di";
import { interfaces } from "inversify";
import { LAYOUT_MODULE } from "src/app.symbols";
import { ILayoutRepository } from "../domain/repositories/layout.repository";
import { CalculateLayoutUseCase } from "../domain/use-cases/interactors/calculate-layout.interactor";
import { GetLayoutUseCase } from "../domain/use-cases/interactors/get-layout.interactor";
import { CalculateLayoutInPort } from "../domain/use-cases/port/calculate-layout.in-port";
import { GetLayoutInPort } from "../domain/use-cases/port/get-layout.in-port";
import { LayoutRepositoryImpl } from "../infrastructure/layout.impl.reposity";
import { LayoutController } from "./controllers/layout.controller";

export class LayoutModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.layoutRepositoryImpl(bind);
    this.layoutController(bind);

    this.calculateLayoutUseCase(bind);
    this.getLayoutUseCase(bind);
  }

  private layoutRepositoryImpl(bind: interfaces.Bind): void {
    bind<ILayoutRepository>(LAYOUT_MODULE.LAYOUT_REPOSITORY_IMPL).to(
      LayoutRepositoryImpl
    );
  }
  private calculateLayoutUseCase(bind: interfaces.Bind): void {
    bind<CalculateLayoutInPort>(LAYOUT_MODULE.CALCULATE_LAYOUT_USECASE).to(
      CalculateLayoutUseCase
    );
  }
  private getLayoutUseCase(bind: interfaces.Bind): void {
    bind<GetLayoutInPort>(LAYOUT_MODULE.GET_LAYOUT_USECASE).to(
      GetLayoutUseCase
    );
  }
  private layoutController(bind: interfaces.Bind): void {
    bind<LayoutController>(LAYOUT_MODULE.LAYOUT_CONTROLLER).to(
      LayoutController
    );
  }
}
