import { ILayoutRepository } from "@core/domain/repositories";
import { StoragePort } from "./storage.port";
import { LayoutProps } from "@core/domain/types";

export class LayoutRepositoryImpl implements ILayoutRepository {
  protected readonly key: string = "layout";
  constructor(private readonly storage: StoragePort) {}
  insertLayout(props: LayoutProps): LayoutProps {
    this.storage.set(this.key, props);
    return props;
  }
  getLayout(): LayoutProps {
    const layout = this.storage.get(this.key);
    return layout;
  }
}
