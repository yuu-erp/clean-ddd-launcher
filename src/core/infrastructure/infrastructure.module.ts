import { INFRASTRUCTURE } from "src/app.symbols";
import { interfaces } from "inversify";
import { BaseModule } from "./di";
import { InMemoryStorageAdapter, StoragePort } from "./storage";
import { SystemCore, SystemCorePort } from "./system-core";

export class InfrastructureModule extends BaseModule {
  protected onInit(bind: interfaces.Bind): void {
    this.inMemoryStorageAdapter(bind);
    this.provideSystemCore(bind);
  }

  private inMemoryStorageAdapter(bind: interfaces.Bind): void {
    bind<StoragePort>(INFRASTRUCTURE.IN_MEMORY_STORAGE_ADAPTER).to(
      InMemoryStorageAdapter
    );
  }

  private provideSystemCore(bind: interfaces.Bind): void {
    bind<SystemCorePort>(INFRASTRUCTURE.SYSTEM_CORE).to(SystemCore);
  }
}
