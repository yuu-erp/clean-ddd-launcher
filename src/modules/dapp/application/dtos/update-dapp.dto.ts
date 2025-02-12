import { DappProps } from "../../domain/entities/dapp.type";

export interface UpdateDappDto {
  id: number;
  data: Partial<DappProps>;
}
