import { DappPosition } from "@core/domain/value-objects";

export enum DappTypeEnum {
  DAPP = 1,
  FRAME = 2,
  GROUP = 3,
}

export interface DappProps {
  id: number;
  name: string;
  logo: string;
  url: string;
  type: DappTypeEnum;
  page: number;
  position: DappPosition;
}
export interface DappRecord {
  id: number;
  name: string;
  logo: string;
  url: string;
  page: number;
  position: { width: number; height: number; x: number; y: number };
  type: DappTypeEnum; // Trả về enum thay vì string
}

export interface DappResponse extends DappRecord {}
