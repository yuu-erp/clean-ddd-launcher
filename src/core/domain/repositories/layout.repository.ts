import { LayoutProps } from "../types";

export interface ILayoutRepository {
  insertLayout(props: LayoutProps): LayoutProps;
  getLayout(): LayoutProps;
}
