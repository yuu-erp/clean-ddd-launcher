import { LayoutProps } from "@core/domain/types";
import { UseCase } from "@core/domain/use-cases.port.base";

export abstract class GetLayoutInPort implements UseCase<unknown, LayoutProps> {
  abstract execute(): LayoutProps;
}
