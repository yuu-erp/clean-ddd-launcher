import { Logger } from "@core/infrastructure/logger";
import { AppContainer } from "./app-container";
import { DappController } from "./modules/dapp/application/controllers/dapp.controller";
import { DAPP_MODULE, INFRASTRUCTURE } from "./app.symbols";
import { DappPosition } from "./modules/dapp/domain/value-objects/dapp-position.value-object";
import { StoragePort } from "@core/infrastructure/storage";

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  try {
    logger.log("Starting compilation in watch mode...");
    const app = new AppContainer();
    const inMemoryStorageAdapter = app.get<StoragePort>(
      INFRASTRUCTURE.IN_MEMORY_STORAGE_ADAPTER
    );
    const dappController = app.get<DappController>(DAPP_MODULE.DAPP_CONTROLLER);
    dappController.createDapp({
      id: 1,
      name: "Dapp 1",
      logo: "https://",
      url: "https://",
      page: 0,
      type: 1,
      position: new DappPosition({ width: 1, height: 1, x: 0, y: 0 }),
    });
    dappController.updateDapp({
      id: 1,
      data: {
        name: "Lê Khải Hoàn",
      },
    });
    logger.debug("inMemoryStorageAdapter", inMemoryStorageAdapter.getAll());
  } catch (error) {
    logger.error("Application fail", error);
  }
}

void bootstrap();
