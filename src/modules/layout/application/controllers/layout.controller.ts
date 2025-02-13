import { inject, injectable } from "inversify";
import { LAYOUT_MODULE } from "src/app.symbols";
import { CalculateLayoutInPort } from "../../domain/use-cases/port/calculate-layout.in-port";
import { GetLayoutInPort } from "../../domain/use-cases/port/get-layout.in-port";
import { CalculateLayoutService } from "../services/calculate-layout.service";
import { LayoutProps } from "../../domain/entities/layout.type";

@injectable()
export class LayoutController {
  constructor(
    @inject(LAYOUT_MODULE.CALCULATE_LAYOUT_USECASE)
    private readonly calculateLayoutUseCase: CalculateLayoutInPort,
    @inject(LAYOUT_MODULE.GET_LAYOUT_USECASE)
    private readonly getLayoutUseCase: GetLayoutInPort
  ) {}

  calculateLayout() {
    const layout = CalculateLayoutService.calculateLayout();
    return this.calculateLayoutUseCase.execute(layout);
  }

  getLayout(): LayoutProps {
    return this.getLayoutUseCase.execute() as LayoutProps;
  }
}
