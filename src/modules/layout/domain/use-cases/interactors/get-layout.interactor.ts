import { inject, injectable } from "inversify";
import { INFRASTRUCTURE } from "src/app.symbols";
import { LayoutProps } from "../../entities/layout.type";
import type { ILayoutRepository } from "../../repositories/layout.repository";
import { GetLayoutInPort } from "../port/get-layout.in-port";

@injectable()
export class GetLayoutUseCase implements GetLayoutInPort {
  constructor(
    @inject(INFRASTRUCTURE.IN_MEMORY_STORAGE_ADAPTER)
    private readonly layoutRepository: ILayoutRepository
  ) {}

  execute(): LayoutProps {
    return this.layoutRepository.find();
  }
}
