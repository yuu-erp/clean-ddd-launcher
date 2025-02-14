import { DappRecord } from "@core/domain/types";
import { DappComponents } from "../components/dapp-components";
import { LayoutController } from "@core/application/controllers";

export class ListDapp {
  private readonly container: HTMLElement;
  constructor(private readonly layoutController: LayoutController) {
    this.container = document.querySelector(".main_container") as HTMLElement;
  }
  render(dapps: DappRecord[]) {
    if (!this.container) throw new Error("CLASS .main_container not found!");
    const layout = this.layoutController.getLayout();
    dapps.forEach((dapp) => {
      const dappComponent = new DappComponents(dapp, layout);
      this.container.appendChild(dappComponent.getElement());
    });
  }
}
