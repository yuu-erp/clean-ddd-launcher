import type { StoragePort } from "@core/infrastructure/storage";
import { EntityId, StringEnum } from "@techmely/types";
import { inject, injectable } from "inversify";
import { INFRASTRUCTURE } from "src/app.symbols";
import { ILayoutRepository } from "../domain/repositories/layout.repository";
import { LayoutProps } from "../domain/entities/layout.type";

@injectable()
export class LayoutRepositoryImpl implements ILayoutRepository {
  protected readonly key: string = "layout";
  constructor(
    @inject(INFRASTRUCTURE.IN_MEMORY_STORAGE_ADAPTER)
    protected readonly storage: StoragePort
  ) {}
  insert(entity: LayoutProps): LayoutProps | Promise<LayoutProps> {
    this.storage.set(this.key, entity);
    return entity;
  }
  find(): LayoutProps {
    const layout = this.storage.get(this.key);
    return layout;
  }
  // 🚀 Các method khác...
  findByKey(_key: StringEnum<keyof LayoutProps>): LayoutProps | null {
    throw new Error("Method not implemented.");
  }
  findAll(): LayoutProps[] {
    throw new Error("Method not implemented.");
  }
  findById(_id: EntityId): LayoutProps | null {
    throw new Error("Method not implemented.");
  }
  insertMany(_entities: LayoutProps[]): LayoutProps[] | Promise<LayoutProps[]> {
    throw new Error("Method not implemented.");
  }

  update(_entity: LayoutProps): void | LayoutProps {
    throw new Error("Method not implemented.");
  }
  updateMany(_entities: LayoutProps[]): void | LayoutProps[] {
    throw new Error("Method not implemented.");
  }

  delete(_entity: LayoutProps): boolean {
    throw new Error("Method not implemented.");
  }

  deleteById(_id: string): boolean {
    throw new Error("Method not implemented.");
  }

  transaction<T>(_handler: () => T): T {
    throw new Error("Method not implemented.");
  }
}
