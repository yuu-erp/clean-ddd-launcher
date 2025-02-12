import { BaseModule } from "@core/infrastructure/di";
import { interfaces } from "inversify";
import { LayoutController } from "./layout.controller";
import { MODULE } from "@core/app.symbols";

export class LayoutModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.layoutController(bind);
  }

  private layoutController(bind: interfaces.Bind): void {
    bind<LayoutController>(MODULE.LAYOUT_CONTROLLER).to(LayoutController);
  }
}
