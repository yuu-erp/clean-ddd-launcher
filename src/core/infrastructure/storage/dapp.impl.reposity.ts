import { Mapper } from "@core/application/mappers";
import { DappEntity } from "@core/domain/entities";
import { IDappRepository } from "@core/domain/repositories";
import { DappRecord, DappResponse } from "@core/domain/types";
import type { StoragePort } from "@core/infrastructure/storage";
import { StringEnum } from "@techmely/types";

export class DappRepositoryImpl implements IDappRepository {
  protected readonly key: string = "applications";
  constructor(
    protected readonly storage: StoragePort,
    protected readonly mapper: Mapper<DappEntity, DappRecord, DappResponse>
  ) {}
  findAll(): DappEntity[] {
    const records = this.storage.get(this.key) || [];
    return records.map(this.mapper.toDomain);
  }
  findById(id: number): DappEntity | null {
    const records: DappResponse[] = this.storage.get(this.key) || [];
    const record = records.find((item) => item.id === id);
    return record ? this.mapper.toDomain(record) : null;
  }
  insert(entity: DappEntity): DappEntity {
    const records = this.storage.get(this.key) || [];
    const newRecord = this.mapper.toResponse(entity); // Convert entity sang response
    records.push(newRecord);
    this.storage.set(this.key, records); // Lưu lại vào storage
    return entity;
  }
  insertMany(entities: DappEntity[]): DappEntity[] {
    const records: DappResponse[] = this.storage.get(this.key) || [];
    const newRecords = entities.map(this.mapper.toResponse);
    this.storage.set(this.key, [...records, ...newRecords]); // Gộp danh sách cũ + mới
    return entities;
  }
  update(entity: DappEntity): DappEntity {
    let records: DappResponse[] = this.storage.get(this.key) || [];
    records = records.map((item) =>
      item.id === entity.getProps().id ? this.mapper.toResponse(entity) : item
    );
    this.storage.set(this.key, records);
    return entity;
  }

  // 🚀 Các method khác...
  findByKey(_key: StringEnum<keyof DappEntity>): DappEntity {
    throw new Error("Method not implemented.");
  }
  updateMany(_entities: DappEntity[]): DappEntity[] {
    throw new Error("Method not implemented.");
  }
  delete(_entity: DappEntity): boolean {
    throw new Error("Method not implemented.");
  }
  deleteById(_id: string): boolean {
    throw new Error("Method not implemented.");
  }
  transaction<T>(_handler: () => T): T {
    throw new Error("Method not implemented.");
  }
}
