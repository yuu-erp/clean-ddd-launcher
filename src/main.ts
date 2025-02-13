import { LayoutController } from "@core/application/controllers";
import { CalculateLayoutUseCase } from "@core/application/use-cases/interactors/calculate-layout.interactor";
import { GetLayoutUseCase } from "@core/application/use-cases/interactors/get-layout.interactor";
import { Logger } from "@core/infrastructure/logger";
import { InMemoryStorageAdapter } from "@core/infrastructure/storage";
import { LayoutRepositoryImpl } from "@core/infrastructure/storage/layout.impl.reposity";

import "./styles/index.scss";
import { StatusBar } from "./view/status-bar";
import { Emitter } from "@core/infrastructure/emitter";
import { Dock } from "./view/dock";
import { Pagination } from "./view/pagination";

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  const emitter = new Emitter();
  try {
    logger.log("Starting compilation in watch mode...");
    const inMemoryStorageAdapter = new InMemoryStorageAdapter();
    const layoutRepositoryImpl = new LayoutRepositoryImpl(
      inMemoryStorageAdapter
    );
    const calculateLayoutUseCase = new CalculateLayoutUseCase(
      layoutRepositoryImpl
    );
    const getLayoutUseCase = new GetLayoutUseCase(layoutRepositoryImpl);
    const layoutController = new LayoutController(
      calculateLayoutUseCase,
      getLayoutUseCase
    );
    layoutController.calculate();
    const layout = layoutController.getLayout();

    const statusBar = new StatusBar(layoutController, emitter);
    const dock = new Dock(layoutController);
    const pagination = new Pagination(layoutController);
    statusBar.init();
    dock.init();
    pagination.init();

    logger.debug("layout: ", layout);
    logger.debug("inMemoryStorageAdapter: ", inMemoryStorageAdapter.getAll());
  } catch (error) {
    logger.error("Application fail", error);
  }
}

void bootstrap();
