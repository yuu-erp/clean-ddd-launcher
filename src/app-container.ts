import { BaseContainer } from "@core/infrastructure/di";
import { InfrastructureModule } from "@core/infrastructure/infrastructure.module";
import { DappModule } from "./modules/dapp/application/dapp.module";
import { LayoutModule } from "./modules/layout/application/layout.module";

export class AppContainer extends BaseContainer {
  public init(): void {
    this.initializeCore();
    this.initializeModules();
  }

  private initializeCore() {
    this.load(new InfrastructureModule());
  }
  private initializeModules(): void {
    this.load(new DappModule());
    this.load(new LayoutModule());
  }
}
