import { LayoutController } from "@core/application/controllers";

export class Main {
  constructor(private readonly layoutController: LayoutController) {}
  init() {
    const {} = this.layoutController.getLayout();
  }
}
