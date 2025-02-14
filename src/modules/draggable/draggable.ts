import { Emitter } from "@core/infrastructure/emitter";
import { DraggableCore } from "./draggable-core";
export class Draggable extends DraggableCore {
  private startX: number = 0;
  private startY: number = 0;
  private timeStart: number = 0;
  private isMoveMain: boolean = false;
  private isMoveDapp: boolean = false;
  private holdTimeout: number | undefined;

  constructor(element: HTMLElement, private readonly emitter: Emitter) {
    super(element);
  }

  onStartDraggable(event: TouchEvent | MouseEvent): void {
    if (this.isMoveMain) return;
    const { clientX, clientY, target } = this.getClientCoordinates(event);
    this.isMoveMain = true;
    this.timeStart = performance.now();
    this.startX = clientX;
    this.startY = clientY;
    this.holdTimeout = window.setTimeout(() => {
      this.emitter.emit("toggleEditMode", true);
    }, 500); // 500ms để kích hoạt chế độ chỉnh sửa
  }

  onMoveDraggable(event: TouchEvent | MouseEvent): void {
    if (!this.isMoveMain) return;
    const { clientX, clientY } = this.getClientCoordinates(event);
    const { deltaX, deltaY } = this.calculateDelta(clientX, clientY, true);
    const deltaThreshold = 2;
    if (Math.abs(deltaX) < deltaThreshold && Math.abs(deltaY) < deltaThreshold)
      return;
    clearTimeout(this.holdTimeout);
  }

  onEndDraggable(event: TouchEvent | MouseEvent): void {
    if (!this.isMoveMain) return;
    clearTimeout(this.holdTimeout);

    this.reset();
  }

  private reset() {
    this.startX = 0;
    this.startY = 0;
    this.timeStart = 0;
    this.isMoveMain = false;
    this.isMoveDapp = false;
  }

  private calculateDelta(
    clientX: number,
    clientY: number,
    includeTime: boolean = false
  ): { deltaX: number; deltaY: number; deltaTime?: number } {
    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;
    const deltaTime = includeTime
      ? performance.now() - this.timeStart
      : undefined;
    return { deltaX, deltaY, deltaTime };
  }
}
