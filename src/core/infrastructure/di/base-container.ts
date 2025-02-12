import { Container } from "inversify";

export abstract class BaseContainer extends Container {
  constructor() {
    super({ defaultScope: "Singleton", skipBaseClassChecks: true });
    this.init();
  }

  protected abstract init(): void;
}
