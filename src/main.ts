import { Logger } from "@core/infrastructure/logger";
import { StoragePort } from "@core/infrastructure/storage";
import { AppContainer } from "./app-container";
import { INFRASTRUCTURE, LAYOUT_MODULE } from "./app.symbols";
import { DraggableController } from "./modules/draggable/application/draggable.controller";
import { DraggableService } from "./modules/draggable/application/draggable.service";
import { LayoutController } from "./modules/layout/application/controllers/layout.controller";

import { mittAsync } from "@core/domain/events";

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  try {
    logger.log("Starting compilation in watch mode...");
    const rootElement = document.getElementById("app") as HTMLElement;

    const app = new AppContainer();

    const inMemoryStorageAdapter = app.get<StoragePort>(
      INFRASTRUCTURE.IN_MEMORY_STORAGE_ADAPTER
    );

    const layoutController = app.get<LayoutController>(
      LAYOUT_MODULE.LAYOUT_CONTROLLER
    );
    layoutController.calculateLayout();

    const draggableService = new DraggableService(rootElement, mittAsync());
    new DraggableController(draggableService);

    logger.debug("inMemoryStorageAdapter", inMemoryStorageAdapter.getAll());
  } catch (error) {
    logger.error("Application fail", error);
  }
}

void bootstrap();
