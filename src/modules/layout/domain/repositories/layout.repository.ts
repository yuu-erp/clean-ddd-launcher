import { RepositoryPort } from "@core/domain/repositories";
import { LayoutProps } from "../entities/layout.type";

export interface ILayoutRepository extends RepositoryPort<LayoutProps> {
  find(): LayoutProps;
}
