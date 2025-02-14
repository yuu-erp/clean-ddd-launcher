import { Logger } from "@core/infrastructure/logger";
import { Dock } from "./view/dock";
import { Main } from "./view/main";
import { Pagination } from "./view/pagination";
import { StatusBar } from "./view/status-bar";
import { dependency } from "./dependency";
import { ListDapp } from "./view/features/list-dapp";

import "./styles/index.scss";

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  try {
    const {
      emitter,
      layoutController,
      dappController,
      fetchDataController,
      inMemoryStorageAdapter,
    } = dependency();

    logger.log("Starting compilation in watch mode...");
    layoutController.calculate();
    const dataDapp = await fetchDataController.handleGetDataDApp();
    inMemoryStorageAdapter.set("totalPage", dataDapp.data.length);
    dappController.insertDapps(dataDapp.data);
    const dapps = dappController.getDapps();

    const statusBar = new StatusBar(layoutController, emitter);
    const main = new Main(inMemoryStorageAdapter);
    const dock = new Dock(layoutController);
    const pagination = new Pagination(layoutController);
    const listDapp = new ListDapp(layoutController);
    statusBar.init();
    main.init();
    dock.init();
    pagination.init();
    listDapp.render(dapps);

    logger.debug("inMemoryStorageAdapter: ", inMemoryStorageAdapter.getAll());
  } catch (error) {
    logger.error("Application fail", error);
  }
}

void bootstrap();
