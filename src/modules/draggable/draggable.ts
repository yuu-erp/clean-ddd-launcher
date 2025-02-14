import { DraggableCore } from "./draggable-core";
export enum EnumMoveType {
  stop,
  dapp,
  main,
}
export class Draggable extends DraggableCore {
  private startX: number = 0;
  private startY: number = 0;
  private timeStart: number = 0;
  private moveType = EnumMoveType.stop;
  constructor(element: HTMLElement) {
    super(element);
  }

  onStartDraggable(event: TouchEvent | MouseEvent): void {
    if (this.moveType !== EnumMoveType.stop) return;
    const { x, y } = this.getClientCoordinates(event);
    this.timeStart = performance.now();
    this.startX = x;
    this.startY = y;
  }

  onMoveDraggable(event: TouchEvent | MouseEvent): void {}

  onEndDraggable(event: TouchEvent | MouseEvent): void {}
}
