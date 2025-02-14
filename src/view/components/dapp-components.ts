import { DappRecord, LayoutProps } from "@core/domain/types";
import { styleElement } from "@core/helpers";

export class DappComponents {
  private element: HTMLElement;
  private dapp: DappRecord;
  private layout: LayoutProps;
  constructor(dapp: DappRecord, layout: LayoutProps) {
    this.dapp = dapp;
    this.layout = layout;
    const template = document.getElementById(
      "dapp-template"
    ) as HTMLTemplateElement;
    if (!template) throw new Error("Template dapp-template không tồn tại!");
    this.element = template.content.firstElementChild!.cloneNode(
      true
    ) as HTMLElement;

    this.render();
  }

  private render() {
    const {
      itemHeight,
      itemWidth,
      outerPadding,
      screenCheckPoint,
      heightStatusBar,
    } = this.layout;
    const { position, page, name } = this.dapp;
    const top = Math.round(position.y * itemHeight + heightStatusBar) + "px";
    const left =
      Math.round(
        position.x * itemWidth +
          page * innerWidth +
          outerPadding +
          (innerWidth - screenCheckPoint) / 2
      ) + "px";
    styleElement(this.element.style, {
      height: Math.round(itemHeight) + "px",
      width: Math.round(itemWidth) + "px",
      left: "0",
      top: "0",
      transform: `translate(${left}, ${top})`,
    });

    const textElement = this.element.querySelector(
      ".app-item_container > p"
    ) as HTMLElement;
    if (!textElement) return;
    textElement.textContent = name;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
