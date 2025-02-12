import { Device } from "../enums";

export interface ILayout {
  device: Device;
  screenCheckPoint: number;
  heightStatusBar: number;
  heightPagination: number;
  heightDock: number;
  heightDockContainer: number;
  widthDock: number;
  columnDockNumber: number;
  columnNumber: number;
  rowsNumber: number;
  sizeIcon: number;
  itemWidth: number;
  itemHeight: number;
  outerPadding: number;
}
