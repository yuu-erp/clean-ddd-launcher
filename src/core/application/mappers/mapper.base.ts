import { Entity } from "@core/domain/entities";

export interface Mapper<
  DomainEntity extends Entity<unknown>,
  DbRecord,
  ResponseDTO = unknown
> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: DbRecord): DomainEntity;
  toResponse(entity: DomainEntity): ResponseDTO;
}
