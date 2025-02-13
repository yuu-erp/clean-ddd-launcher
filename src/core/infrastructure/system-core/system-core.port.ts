import { DataResponse, Payload } from "./system-core.type";

export interface SystemCorePort {
  send<T, U>(payload: Payload<T>): Promise<DataResponse<U>>;
}
