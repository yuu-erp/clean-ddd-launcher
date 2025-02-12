import { ContainerModule, interfaces } from "inversify";

export abstract class BaseModule extends ContainerModule {
  constructor() {
    super((bind: interfaces.Bind) => {
      this.onInit(bind);
    });
  }

  protected abstract onInit(bind: interfaces.Bind): void;
}
