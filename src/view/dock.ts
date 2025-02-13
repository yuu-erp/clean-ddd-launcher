import { LayoutController } from "@core/application/controllers";
import { styleElement } from "@core/helpers";

export class Dock {
  private element: HTMLElement;
  private containerElement: HTMLElement;
  constructor(private readonly layout: LayoutController) {
    this.element = document.getElementById("dock") as HTMLElement;
    this.containerElement = document.querySelector(
      ".dock_container"
    ) as HTMLElement;
  }
  init() {
    const { heightDock, heightDockContainer, widthDock } =
      this.layout.getLayout();
    if (!this.element) throw new Error("ID #dock not found!");
    if (!this.containerElement)
      throw new Error("CLASS .dock_container not found!");
    styleElement(this.element.style, {
      height: heightDock + "px",
    });
    styleElement(this.containerElement.style, {
      height: heightDockContainer + "px",
      width: widthDock + "px",
      background: "rgba(0,0,0,0.8)",
      borderRadius: "40px",
    });
  }
}
