import { ILayoutRepository } from "@core/domain/repositories";
import { GetLayoutInPort } from "../port/get-layout.in-port";
import { LayoutProps } from "@core/domain/types";

export class GetLayoutUseCase implements GetLayoutInPort {
  constructor(private readonly layoutRepository: ILayoutRepository) {}

  execute(): LayoutProps {
    return this.layoutRepository.getLayout();
  }
}
