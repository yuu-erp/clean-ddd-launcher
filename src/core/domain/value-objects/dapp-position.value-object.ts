import { invariant } from "@techmely/utils";
import { ValueObject } from "./value-object.base";
import { ArgumentNotProvidedException } from "@core/exceptions";

export interface IDappPosition {
  width: number;
  height: number;
  x: number;
  y: number;
}
export class DappPosition extends ValueObject<IDappPosition> {
  protected validate(props: IDappPosition): void {
    const { width, height, x, y } = props;
    invariant(
      typeof width === "number" && width > 0,
      new ArgumentNotProvidedException("width cannot be empty!")
    );
    invariant(
      typeof height === "number" && height > 0,
      new ArgumentNotProvidedException("height cannot be empty!")
    );
    invariant(
      typeof x === "number",
      new ArgumentNotProvidedException("x cannot be empty!")
    );
    invariant(
      typeof y === "number",
      new ArgumentNotProvidedException("y cannot be empty!")
    );
  }
}
