import { DraggableCore } from "../draggable-core";
import { Emitter } from "@core/infrastructure/emitter";
export class DraggableService extends DraggableCore {
  constructor(rootElement: HTMLElement, private readonly emitter: Emitter) {
    super(rootElement);
  }

  onStartDraggable(event: TouchEvent | MouseEvent): void {
    console.log("onStartDraggable", event);
    this.emitter.emit("onStartSwiperPage", "1");
  }
  onMoveDraggable(event: TouchEvent | MouseEvent): void {
    console.log("onMoveDraggable", event);
    this.emitter.emit("onMoveSwiperPage", "1");
  }
  onEndDraggable(event: TouchEvent | MouseEvent): void {
    console.log("onEndDraggable", event);
    this.emitter.emit("onEndSwiperPage", "1");
  }
}
