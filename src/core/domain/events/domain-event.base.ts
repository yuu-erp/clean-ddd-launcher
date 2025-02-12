import { ArgumentNotProvidedException } from "@core/exceptions";
import { generatePrefixId } from "@core/helpers";
import { invariant } from "@techmely/utils";
import { UniqueEntityID } from "../entities";

type DomainEventMetadata = {
  readonly timestamp: number;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
};

export type IDomainEvent<T> = Omit<T, "id" | "_metadata"> & {
  _metadata: DomainEventMetadata;
  aggregateId: UniqueEntityID;
};

export abstract class DomainEvent {
  readonly id: UniqueEntityID;
  readonly aggregateId: UniqueEntityID;
  readonly _metadata: DomainEventMetadata;

  constructor(domainEvent: IDomainEvent<unknown>) {
    invariant(
      domainEvent,
      new ArgumentNotProvidedException("Domain event props should not be empty")
    );
    invariant(
      typeof domainEvent._metadata?.timestamp !== "number",
      new ArgumentNotProvidedException(
        "Timestamp should be provided in domain event metadata"
      )
    );

    this.id = new UniqueEntityID(generatePrefixId("de"));
    this.aggregateId = domainEvent.aggregateId;
    this._metadata = {
      correlationId: domainEvent._metadata?.correlationId,
      causationId: domainEvent._metadata?.causationId,
      timestamp: domainEvent._metadata?.timestamp,
      userId: domainEvent._metadata?.userId,
    };
  }
}
