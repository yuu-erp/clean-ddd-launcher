export const APPLICATION = {
  CREATE_DAPP_USECASE: Symbol.for("CreateDappUseCase"),
  UPDATE_DAPP_USECASE: Symbol.for("UpdateDappUseCase"),
  MOVE_DAPP_USECASE: Symbol.for("MoveDappUseCase"),
};
export const INFRASTRUCTURE = {
  IN_MEMORY_STORAGE_ADAPTER: Symbol.for("InMemoryStorageAdapter"),
};
export const MODULE = {
  // APP
  DAPP_MAPPER: Symbol.for("DappMapper"),
  DAPP_REPOSITORY_IMPL: Symbol.for("DappRepositoryImpl"),
  DAPP_CONTROLLER: Symbol.for("DappController"),
  // LAYOUT
  LAYOUT_REPOSITOTY_IMPL: Symbol.for("LayoutRepositoryImpl"),
  LAYOUT_CONTROLLER: Symbol.for("LayoutController"),
};
