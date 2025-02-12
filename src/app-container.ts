import { ApplicationModule } from "@core/application/application.module";
import { BaseContainer } from "@core/infrastructure/di";
import { InfrastructureModule } from "@core/infrastructure/infrastructure.module";
import { DappModule } from "./modules/dapp/dapp.module";

export class AppContainer extends BaseContainer {
  public init(): void {
    this.initializeCore();
    this.initializeModules();
  }

  private initializeCore() {
    this.provideInfrastructure();
    this.provideApplication();
  }
  private initializeModules(): void {
    this.provideDappModule();
  }
  // core/infrastructure
  private provideInfrastructure(): void {
    this.load(new InfrastructureModule());
  }
  // core/application
  private provideApplication(): void {
    this.load(new ApplicationModule());
  }
  // modules/dapp
  private provideDappModule(): void {
    this.load(new DappModule());
  }
}
