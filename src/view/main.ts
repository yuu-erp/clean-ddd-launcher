import { styleElement } from "@core/helpers";
import { StoragePort } from "@core/infrastructure/storage";

export class Main {
  private element: HTMLElement;
  private containerElement: HTMLElement;
  constructor(private readonly storage: StoragePort) {
    this.element = document.getElementById("main") as HTMLElement;
    this.containerElement = document.querySelector(
      ".main_container"
    ) as HTMLElement;
  }
  init() {
    if (!this.element) throw new Error("ID #main not found!");
    if (!this.containerElement)
      throw new Error("CLASS .main_container not found!");
    const totalPage = this.storage.get("totalPage");
    console.log("totalPage: ", totalPage);
    styleElement(this.containerElement.style, {
      width: totalPage * innerWidth + "px",
    });
  }
}
