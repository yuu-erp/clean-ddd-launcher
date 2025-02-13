import { useResponsiveValue } from "@core/helpers";
import {
  CHECKPOINT_COLUMN,
  CHECKPOINT_COLUMN_DOCK,
  CHECKPOINT_DEVICE,
  HEIGHT_DOCK,
  HEIGHT_DOCK_CONTAINER,
  HEIGHT_PAGINATION,
  HEIGHT_STATUS_BAR,
  SIZE_ICON,
} from "@core/constants/layout.constant";
import { Device } from "@core/domain/enums";
import { LayoutProps } from "@core/domain/types";

export class CalculateLayoutService {
  static calculateLayout(): LayoutProps {
    const screenCheckPoint =
      this.device() === Device.MOBILE ? innerWidth : innerWidth * 0.7;
    const heightStatusBar = useResponsiveValue(HEIGHT_STATUS_BAR, 60);
    const heightPagination = useResponsiveValue(HEIGHT_PAGINATION, 40);
    const heightDock = useResponsiveValue(HEIGHT_DOCK, 120);
    const heightDockContainer = useResponsiveValue(HEIGHT_DOCK_CONTAINER, 96);
    const sizeIcon = useResponsiveValue(SIZE_ICON, 60);
    const columnNumber = useResponsiveValue(CHECKPOINT_COLUMN, 4);
    const columnDockNumber = useResponsiveValue(CHECKPOINT_COLUMN_DOCK, 4);

    const { itemWidth, outerPadding } = this.calculateGridDimensions(
      screenCheckPoint,
      columnNumber
    );
    const itemHeight = this.calculateItemHeight(itemWidth);
    const rowsNumber = this.calculateRowsNumber(
      heightStatusBar,
      heightPagination,
      heightDock,
      itemHeight
    );

    const widthDock = this.calculateDockWidth(
      sizeIcon,
      outerPadding,
      columnDockNumber
    );

    return {
      device: this.device(),
      screenCheckPoint,
      heightStatusBar,
      heightPagination,
      heightDock,
      heightDockContainer,
      widthDock,
      columnDockNumber,
      columnNumber,
      rowsNumber,
      sizeIcon,
      itemWidth,
      itemHeight,
      outerPadding,
    };
  }

  private static device(): Device {
    return useResponsiveValue(CHECKPOINT_DEVICE, Device.MOBILE);
  }

  private static calculateItemHeight(itemWidth: number): number {
    return itemWidth * 1.1;
  }

  private static calculateRowsNumber(
    heightStatusBar: number,
    heightPagination: number,
    heightDock: number,
    itemHeight: number
  ): number {
    return Math.floor(
      (innerHeight - heightStatusBar - heightPagination - heightDock) /
        itemHeight
    );
  }

  private static calculateDockWidth(
    sizeIcon: number,
    outerPadding: number,
    columnDockNumber: number
  ): number {
    return this.device() === Device.MOBILE
      ? innerWidth - outerPadding * 2
      : columnDockNumber * sizeIcon +
          columnDockNumber * outerPadding +
          outerPadding;
  }

  private static calculateGridDimensions(
    screenCheckPoint: number,
    columnNumber: number
  ): { itemWidth: number; outerPadding: number } {
    const factor = 20;
    const outerPadding = screenCheckPoint / (columnNumber * factor);
    const gridGap = outerPadding;
    const totalPadding = 2 * outerPadding + (columnNumber - 1) * gridGap;
    const itemWidth = (screenCheckPoint - totalPadding) / columnNumber;
    return {
      itemWidth,
      outerPadding: totalPadding / 2,
    };
  }
}
