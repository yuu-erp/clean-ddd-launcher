import type { DappProps } from "@core/domain/types";
import { DappPosition } from "@core/domain/value-objects";

export interface CreateDappDto extends DappProps {}

export interface CheckExistPositonDto extends DappPosition {}

export interface UpdateDappDto {
  id: number;
  data: Partial<DappProps>;
}

export interface MoveDappDto {
  id: number;
  position: DappPosition;
  page?: number;
}
