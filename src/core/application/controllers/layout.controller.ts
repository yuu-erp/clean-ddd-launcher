import { CalculateLayoutService } from "../services";
import { CalculateLayoutInPort } from "../use-cases/port/calculate-layout.in-port";
import { GetLayoutInPort } from "../use-cases/port/get-layout.in-port";

export class LayoutController {
  constructor(
    private readonly calculateLayoutUseCase: CalculateLayoutInPort,
    private readonly getLayoutUseCase: GetLayoutInPort
  ) {}

  calculate() {
    const payload = CalculateLayoutService.calculateLayout();
    return this.calculateLayoutUseCase.execute(payload);
  }

  getLayout() {
    return this.getLayoutUseCase.execute();
  }
}
