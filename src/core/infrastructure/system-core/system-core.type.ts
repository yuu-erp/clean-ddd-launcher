export interface Payload<T = unknown> {
  command: string;
  value?: T;
  appId?: string;
  messageId?: string;
}
export interface DataResponse<T> {
  success?: boolean;
  granted?: boolean | number;
  data?: T;
  message?: string;
  code?: string | number;
  status?: number;
}
