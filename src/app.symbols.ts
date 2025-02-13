export const INFRASTRUCTURE = {
  IN_MEMORY_STORAGE_ADAPTER: Symbol.for("InMemoryStorageAdapter"),
  SYSTEM_CORE: Symbol.for("SystemCore"),
};
export const DAPP_MODULE = {
  DAPP_MAPPER: Symbol.for("DappMapper"),
  DAPP_REPOSITORY_IMPL: Symbol.for("DappRepositoryImpl"),
  DAPP_CONTROLLER: Symbol.for("DappController"),
  CREATE_DAPP_USECASE: Symbol.for("CreateDappUseCase"),
  UPDATE_DAPP_USECASE: Symbol.for("UpdateDappUseCase"),
};
export const LAYOUT_MODULE = {
  LAYOUT_REPOSITORY_IMPL: Symbol.for("LayoutRepositoryImpl"),
  LAYOUT_CONTROLLER: Symbol.for("LayoutController"),
  CALCULATE_LAYOUT_USECASE: Symbol.for("CalculateLayoutUseCase"),
  GET_LAYOUT_USECASE: Symbol.for("GetLayoutUseCase"),
  LAYOUT_VIEW: Symbol.for("LayoutView"),
};
export const FETCH_DATA_MODULE = {
  FETCH_DATA_SERVICE: Symbol.for("FetchDataService"),
  FETCH_DATA_CONTROLLER: Symbol.for("FetchDataController"),
};
