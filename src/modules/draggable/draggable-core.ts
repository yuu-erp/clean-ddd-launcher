export abstract class DraggableCore {
  private isTouch: boolean;

  private static readonly TOUCH_EVENTS: Record<
    "start" | "move" | "end",
    keyof HTMLElementEventMap
  > = {
    start: "touchstart",
    move: "touchmove",
    end: "touchend",
  };
  private static readonly MOUSE_EVENTS: Record<
    "start" | "move" | "end",
    keyof HTMLElementEventMap
  > = {
    start: "mousedown",
    move: "mousemove",
    end: "mouseup",
  };

  private onStartHandler: EventListener;
  private onMoveHandler: EventListener;
  private onEndHandler: EventListener;

  constructor(private element: HTMLElement) {
    this.isTouch = "ontouchstart" in window;

    // Định nghĩa lại handler với đúng kiểu EventListener
    this.onStartHandler = (event) =>
      this.handleStart(event as TouchEvent | MouseEvent);
    this.onMoveHandler = (event) =>
      this.handleMove(event as TouchEvent | MouseEvent);
    this.onEndHandler = (event) =>
      this.handleEnd(event as TouchEvent | MouseEvent);

    this.attachEvents();
  }

  private attachEvents() {
    const events = this.getEventTypes();
    this.element.addEventListener(events.start, this.onStartHandler, {
      passive: false,
    });
  }

  private detachEvents() {
    const events = this.getEventTypes();
    this.element.removeEventListener(events.start, this.onStartHandler);
    document.removeEventListener(events.move, this.onMoveHandler);
    document.removeEventListener(events.end, this.onEndHandler);
  }

  private handleStart(event: TouchEvent | MouseEvent) {
    if (event instanceof TouchEvent) event.preventDefault();
    this.onStartDraggable(event);

    const events = this.getEventTypes();
    document.addEventListener(events.move, this.onMoveHandler, {
      passive: false,
    });
    document.addEventListener(events.end, this.onEndHandler);
  }

  private handleMove(event: TouchEvent | MouseEvent) {
    if (event instanceof TouchEvent) event.preventDefault();
    this.onMoveDraggable(event);
  }

  private handleEnd(event: TouchEvent | MouseEvent) {
    this.onEndDraggable(event);

    const events = this.getEventTypes();
    document.removeEventListener(events.move, this.onMoveHandler);
    document.removeEventListener(events.end, this.onEndHandler);
  }

  private getEventTypes() {
    return this.isTouch
      ? DraggableCore.TOUCH_EVENTS
      : DraggableCore.MOUSE_EVENTS;
  }

  protected getClientCoordinates(event: TouchEvent | MouseEvent): {
    x: number;
    y: number;
  } {
    if (
      this.isTouch &&
      event instanceof TouchEvent &&
      event.touches.length > 0
    ) {
      return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    if (event instanceof MouseEvent) {
      return { x: event.clientX, y: event.clientY };
    }
    return { x: 0, y: 0 };
  }

  destroy() {
    this.detachEvents();
  }

  abstract onStartDraggable(event: TouchEvent | MouseEvent): void;
  abstract onMoveDraggable(event: TouchEvent | MouseEvent): void;
  abstract onEndDraggable(event: TouchEvent | MouseEvent): void;
}
