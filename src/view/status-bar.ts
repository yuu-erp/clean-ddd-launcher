import { LayoutController } from "@core/application/controllers";
import { styleElement } from "@core/helpers";
import { Emitter } from "@core/infrastructure/emitter";
export class StatusBar {
  private element: HTMLElement;
  private containerElement: HTMLElement;
  constructor(
    private readonly layoutController: LayoutController,
    private readonly emitter: Emitter
  ) {
    this.element = document.getElementById("status-bar") as HTMLElement;
    this.containerElement = document.querySelector(
      ".status-bar_container"
    ) as HTMLElement;

    this.emitter.on("toggleDoneEvent", (isOpen: boolean) => {
      this.update(isOpen);
    });
  }
  init() {
    const { heightStatusBar, screenCheckPoint, outerPadding } =
      this.layoutController.getLayout();
    if (!this.element) throw new Error("ID #status-bar not found!");
    if (!this.containerElement)
      throw new Error("CLASS .status-bar_container not found!");
    styleElement(this.element.style, {
      height: heightStatusBar + "px",
    });
    styleElement(this.containerElement.style, {
      width: screenCheckPoint + "px",
      padding: `0px ${outerPadding}px`,
    });
  }

  private update(isOpen: boolean) {
    this.containerElement.style.display = isOpen ? "flex" : "none";
  }
}
