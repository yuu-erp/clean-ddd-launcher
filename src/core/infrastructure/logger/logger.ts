import { getCurrentTime } from "@core/helpers";
import { LoggerPort } from "./logger.port";

export class Logger implements LoggerPort {
  log(message: string, ...meta: unknown[]): void {
    console.log(`${getCurrentTime()} [LOG] ${message}`, ...meta);
  }
  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    console.error(`${getCurrentTime()} [ERROR] ${message}`, trace, ...meta);
  }
  warn(message: string, ...meta: unknown[]): void {
    console.warn(`${getCurrentTime()} [WARN] ${message}`, ...meta);
  }
  debug(message: string, ...meta: unknown[]): void {
    console.debug(`${getCurrentTime()} [DEBUG] ${message}`, ...meta);
  }
}
