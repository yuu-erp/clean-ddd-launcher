import { ArgumentNotProvidedException } from "@core/exceptions";
import { styleElement } from "@core/helpers";

export class LayoutView {
  static init(layout: {
    heightStatusBar: number;
    heightPagination: number;
    heightDock: number;
    screenCheckPoint: number;
    outerPadding: number;
    widthDock: number;
    heightDockContainer: number;
  }) {
    const {
      heightStatusBar,
      heightPagination,
      heightDock,
      screenCheckPoint,
      outerPadding,
      widthDock,
      heightDockContainer,
    } = layout;
    const statusBar = document.getElementById("status-bar");
    const statusBarContainer = document.getElementById("status-bar_container");

    const main = document.getElementById("main");
    const mainContainer = document.getElementById("main_container");

    const pagination = document.getElementById("pagination");

    const dock = document.getElementById("dock");
    const dockContainer = document.getElementById("dock_container");
    if (!statusBar)
      throw new ArgumentNotProvidedException(
        "ID #status-bar_container NOT FOUND!"
      );
    if (!statusBarContainer)
      throw new ArgumentNotProvidedException("ID #status-bar NOT FOUND!");
    if (!main) throw new ArgumentNotProvidedException("ID #main NOT FOUND!");
    if (!mainContainer)
      throw new ArgumentNotProvidedException("ID #main_container NOT FOUND!");
    if (!pagination)
      throw new ArgumentNotProvidedException("ID #pagination NOT FOUND!");
    if (!dock) throw new ArgumentNotProvidedException("ID #dock NOT FOUND!");
    if (!dockContainer)
      throw new ArgumentNotProvidedException("ID #dock_container NOT FOUND!");

    styleElement(statusBar.style, {
      height: heightStatusBar + "px",
    });
    styleElement(statusBarContainer.style, {
      width: screenCheckPoint + "px",
      padding: `0px ${outerPadding}px`,
    });
    styleElement(pagination.style, {
      height: heightPagination + "px",
      bottom: heightDock + "px",
    });
    styleElement(dock.style, {
      height: heightDock + "px",
      bottom: "0px",
    });
    styleElement(dockContainer.style, {
      width: widthDock + "px",
      height: heightDockContainer + "px",
      background: "rgba(0,0,0,0.3)",
      backdropFilter: "blur(25px)",
      borderRadius: "40px",
    });
    styleElement(main.style, {
      height: innerHeight + "px",
      width: innerWidth + "px",
    });
    styleElement(mainContainer.style, {
      height: "100%",
      width: 5 * innerWidth + "px",
      background: "rgba(0,0,0,0.5)",
    });
  }
}
