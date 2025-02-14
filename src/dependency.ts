import { LayoutController } from "@core/application/controllers";
import { DappController } from "@core/application/controllers/dapp.controller";
import { DappMapper } from "@core/application/mappers";
import { CalculateLayoutUseCase } from "@core/application/use-cases/interactors/calculate-layout.interactor";
import { CreateDappUseCase } from "@core/application/use-cases/interactors/create-dapp.interactor";
import { GetDappsUseCase } from "@core/application/use-cases/interactors/get-dapps.interactor";
import { GetLayoutUseCase } from "@core/application/use-cases/interactors/get-layout.interactor";
import { InsertDappsUseCase } from "@core/application/use-cases/interactors/insert-dapps.interactor";
import { UpdateDappUseCase } from "@core/application/use-cases/interactors/update-dapp.interactor";
import { Emitter } from "@core/infrastructure/emitter";
import { InMemoryStorageAdapter } from "@core/infrastructure/storage";
import { DappRepositoryImpl } from "@core/infrastructure/storage/dapp.impl.reposity";
import { LayoutRepositoryImpl } from "@core/infrastructure/storage/layout.impl.reposity";
import { SystemCore } from "@core/infrastructure/system-core";
import { FetchDataService } from "./modules/fetch-data/fetch-data.service";
import { FetchDataController } from "./modules/fetch-data/fetch-data.controller";

export function dependency() {
  const emitter = new Emitter();
  const systemCore = new SystemCore();
  const inMemoryStorageAdapter = new InMemoryStorageAdapter();
  const layoutRepositoryImpl = new LayoutRepositoryImpl(inMemoryStorageAdapter);
  const calculateLayoutUseCase = new CalculateLayoutUseCase(
    layoutRepositoryImpl
  );
  const getLayoutUseCase = new GetLayoutUseCase(layoutRepositoryImpl);
  const layoutController = new LayoutController(
    calculateLayoutUseCase,
    getLayoutUseCase
  );

  const dappMapper = new DappMapper();
  const dappRepositoryImpl = new DappRepositoryImpl(
    inMemoryStorageAdapter,
    dappMapper
  );
  const createDappUseCase = new CreateDappUseCase(dappRepositoryImpl);
  const updateDappUseCase = new UpdateDappUseCase(dappRepositoryImpl);
  const insertDappsUseCase = new InsertDappsUseCase(dappRepositoryImpl);
  const getDappsUseCase = new GetDappsUseCase(dappRepositoryImpl);
  const dappController = new DappController(
    dappMapper,
    createDappUseCase,
    updateDappUseCase,
    insertDappsUseCase,
    getDappsUseCase
  );

  const fetchDataService = new FetchDataService(systemCore);
  const fetchDataController = new FetchDataController(fetchDataService);

  return {
    emitter,
    systemCore,
    layoutController,
    dappController,
    fetchDataController,
    inMemoryStorageAdapter,
  };
}
