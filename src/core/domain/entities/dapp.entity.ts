import { DappProps } from "../types";
import { AggregateRoot } from "./aggregate.base";
import { UniqueEntityID } from "./unique-entity";

export class DappEntity extends AggregateRoot<DappProps> {
  static create(createProps: DappProps) {
    const id = new UniqueEntityID(createProps.id);
    const props: DappProps = { ...createProps };
    const dapp = new DappEntity({ id, props });
    return dapp;
  }
  validate(): void {
    // throw new Error("Method not implemented.");
  }
}
