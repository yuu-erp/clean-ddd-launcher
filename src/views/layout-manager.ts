import { LayoutController } from "@core/application/controllers";
import { styleElement } from "@core/helpers";
import { Emitter } from "@core/infrastructure/emitter";

export class LayoutManager {
  private statusBar = document.getElementById("status-bar")!;
  private statusBarContainer = document.querySelector(
    ".status-bar_container"
  )! as HTMLElement;
  private pagination = document.getElementById("pagination")!;
  private dock = document.getElementById("dock")!;
  private dockContainer = document.querySelector(
    ".dock_container"
  )! as HTMLElement;

  constructor(
    private readonly layoutController: LayoutController,
    private readonly emitter: Emitter
  ) {
    this.updateLayout();

    this.emitter.on("toggleEditMode", (isOpen: boolean) => {
      this.toggleEditMode(isOpen);
    });
  }

  updateLayout() {
    const {
      heightStatusBar,
      screenCheckPoint,
      outerPadding,
      heightDock,
      heightDockContainer,
      widthDock,
      heightPagination,
    } = this.layoutController.getLayout();

    styleElement(this.statusBar.style, {
      height: heightStatusBar + "px",
    });
    styleElement(this.statusBarContainer.style, {
      width: screenCheckPoint + "px",
      padding: `0px ${outerPadding}px`,
    });
    styleElement(this.pagination.style, {
      height: heightPagination + "px",
      bottom: heightDock + "px",
    });
    styleElement(this.dock.style, {
      height: heightDock + "px",
    });
    styleElement(this.dockContainer.style, {
      height: heightDockContainer + "px",
      width: widthDock + "px",
      background: "rgba(0,0,0,0.5)",
      borderRadius: "40px",
      backdropFilter: "blur(25px)",
    });
  }

  private toggleEditMode(isEdit: boolean) {
    document.body.classList.toggle("edit", isEdit);
  }
}
