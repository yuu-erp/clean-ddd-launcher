import { BaseModule } from "@core/infrastructure/di";
import { interfaces } from "inversify";
import { FetchDataService } from "./fetch-data.service";
import { FETCH_DATA_MODULE } from "src/app.symbols";
import { FetchDataController } from "./fetch-data.controller";

export class FetchDataModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.fetchDataService(bind);
    this.fetchDataController(bind);
  }

  private fetchDataService(bind: interfaces.Bind): void {
    bind<FetchDataService>(FETCH_DATA_MODULE.FETCH_DATA_SERVICE).to(
      FetchDataService
    );
  }
  private fetchDataController(bind: interfaces.Bind): void {
    bind<FetchDataController>(FETCH_DATA_MODULE.FETCH_DATA_CONTROLLER).to(
      FetchDataController
    );
  }
}
