import { INFRASTRUCTURE } from "@core/app.symbols";
import { interfaces } from "inversify";
import { BaseModule } from "./di";
import { InMemoryStorageAdapter, StoragePort } from "./storage";

export class InfrastructureModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.inMemoryStorageAdapter(bind);
  }

  private inMemoryStorageAdapter(bind: interfaces.Bind): void {
    bind<StoragePort>(INFRASTRUCTURE.IN_MEMORY_STORAGE_ADAPTER).to(
      InMemoryStorageAdapter
    );
  }
}
