import { UseCase } from "@core/domain/use-cases.port.base";
import { LayoutProps } from "../../entities/layout.type";

export abstract class GetLayoutInPort implements UseCase<unknown, LayoutProps> {
  abstract execute(): LayoutProps | Promise<LayoutProps>;
}
