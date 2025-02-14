import { LayoutController } from "@core/application/controllers";
import { styleElement } from "@core/helpers";
import defaultLogo from "../../assets/Custom.svg";
export class Dapp {
  private element: HTMLElement;
  private appData: any;

  constructor(appData: any, private readonly layout: LayoutController) {
    this.appData = appData;

    // Lấy template
    const template = document.getElementById(
      "dapp-template"
    ) as HTMLTemplateElement;
    if (!template) throw new Error("Template dapp-template không tồn tại!");

    // Clone nội dung template
    this.element = template.content.firstElementChild!.cloneNode(
      true
    ) as HTMLElement;
    this.render();
    this.attachEvents();
  }

  private render() {
    const {
      itemHeight,
      itemWidth,
      outerPadding,
      screenCheckPoint,
      heightStatusBar,
    } = this.layout.getLayout();
    console.log("this.element: ", this.element);
    const { position, page } = this.appData;
    const top = Math.round(position.y * itemHeight + heightStatusBar) + "px";

    const left =
      Math.round(
        position.x * itemWidth +
          page * innerWidth +
          outerPadding +
          (innerWidth - screenCheckPoint) / 2
      ) + "px";
    console.log("top", top);
    console.log("left", left);
    styleElement(this.element.style, {
      width: Math.round(itemWidth) + "px",
      height: Math.round(itemHeight) + "px",
      left: "0",
      top: "0",
      transform: `translate(${left}, ${top})`,
    });
    const appItemContainerImg = this.element.querySelector(
      ".app-item_container > div > img"
    ) as HTMLElement;
    console.log("appItemContainerImg: ", appItemContainerImg);
    //@ts-ignore
    appItemContainerImg.src = defaultLogo;
  }

  private attachEvents() {
    this.element.addEventListener("click", () => {
      console.log(`Mở ứng dụng: ${this.appData.name}`);
    });

    this.element.addEventListener("mousedown", (event) => {
      console.log(`Bắt đầu kéo ứng dụng: ${this.appData.name}`);
      // TODO: Thêm chức năng kéo thả
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
