import { DappTypeEnum } from "../enums";
import { DappPosition } from "../value-objects";

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
  type: DappTypeEnum;
}

export interface DappResponse extends DappRecord {}
