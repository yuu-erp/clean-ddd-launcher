import { Logger } from "@core/infrastructure/logger";
import { dependency } from "./dependency";

import "./styles/index.scss";
import { LayoutManager } from "./views/layout-manager";
import { Draggable } from "./modules/draggable/draggable";

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  try {
    const {
      layoutController,
      dappController,
      fetchDataController,
      inMemoryStorageAdapter,
      emitter,
    } = dependency();

    logger.log("Starting compilation in watch mode...");
    layoutController.calculate();
    const dataDapp = await fetchDataController.handleGetDataDApp();
    inMemoryStorageAdapter.set("totalPage", dataDapp.data.length);
    dappController.insertDapps(dataDapp.data);

    new LayoutManager(layoutController, emitter);
    const main = document.getElementById("main") as HTMLElement;
    new Draggable(main, emitter);

    logger.debug("inMemoryStorageAdapter: ", inMemoryStorageAdapter.getAll());
  } catch (error) {
    logger.error("Application fail", error);
  }
}

void bootstrap();
