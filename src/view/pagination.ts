import { LayoutController } from "@core/application/controllers";
import { styleElement } from "@core/helpers";

export class Pagination {
  private element: HTMLElement;
  constructor(private readonly layoutController: LayoutController) {
    this.element = document.getElementById("pagination") as HTMLElement;
  }
  init() {
    const { heightPagination, heightDock } = this.layoutController.getLayout();
    if (!this.element) throw new Error("ID #pagination not found!");
    styleElement(this.element.style, {
      height: heightPagination + "px",
      bottom: heightDock + "px",
    });
  }
}
