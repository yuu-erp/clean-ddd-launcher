import { Logger } from "@core/infrastructure/logger";
import { StoragePort } from "@core/infrastructure/storage";
import { AppContainer } from "./app-container";
import { INFRASTRUCTURE, LAYOUT_MODULE } from "./app.symbols";
import { LayoutController } from "./modules/layout/application/controllers/layout.controller";

import { LayoutView } from "./views/layout.view";
import { DraggableService } from "./modules/draggable/application/draggable.service";
import { DraggableController } from "./modules/draggable/application/draggable.controller";
import { Emitter } from "@core/infrastructure/emitter";

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  try {
    logger.log("Starting compilation in watch mode...");
    const rootElement = document.getElementById("app") as HTMLElement;

    const emitter = new Emitter();

    const app = new AppContainer();

    const inMemoryStorageAdapter = app.get<StoragePort>(
      INFRASTRUCTURE.IN_MEMORY_STORAGE_ADAPTER
    );

    const layoutController = app.get<LayoutController>(
      LAYOUT_MODULE.LAYOUT_CONTROLLER
    );

    const layout = layoutController.calculateLayout();
    LayoutView.init(layout);

    emitter.on("onStartSwiperPage", (event: any) =>
      console.log("KHAIHOAN onStartSwiperPage - event: ", event)
    );
    emitter.on("onMoveSwiperPage", (event: any) =>
      console.log("KHAIHOAN onMoveSwiperPage - event: ", event)
    );
    emitter.on("onEndSwiperPage", (event: any) =>
      console.log("KHAIHOAN onEndSwiperPage - event: ", event)
    );

    const draggableService = new DraggableService(rootElement, emitter);
    new DraggableController(draggableService);

    logger.debug("inMemoryStorageAdapter", inMemoryStorageAdapter.getAll());
  } catch (error) {
    logger.error("Application fail", error);
  }
}

void bootstrap();
