import mitt, { type EventHandlerMap, type Emitter } from "mitt";
import type { EmitDomainEvents } from "./domain-event.types";

export function mittAsync(all?: EventHandlerMap<EmitDomainEvents>) {
  const instance: Emitter<EmitDomainEvents> & {
    emitAsync: <K extends keyof EmitDomainEvents>(
      type: K,
      event: EmitDomainEvents[K]
    ) => Promise<void>;
  } = mitt<EmitDomainEvents>(all) as any;

  instance.emitAsync = async function <K extends keyof EmitDomainEvents>(
    type: K,
    event: EmitDomainEvents[K]
  ) {
    const handlersType = this.all.get(type);
    if (handlersType) {
      for (const handler of handlersType) {
        // @ts-expect-error Ignore typecheck
        await handler(event);
      }
    }
    const handlersWildcard = this.all.get("*");
    if (handlersWildcard) {
      for (const handler of handlersWildcard) {
        await handler(type, event);
      }
    }
  };

  return instance;
}
