import { DappEntity } from "@core/domain/entities";
import { CreateDappDto } from "../dtos/create-dapp.dto";
import { UpdateDappDto } from "../dtos/update-dapp.dto";
import { Mapper } from "../mappers";
import { CreateDappInPort } from "../use-cases/port/create-dapp.in-port";
import { InsertDappsInPort } from "../use-cases/port/insert-dapps.in-port";
import { UpdateDappInPort } from "../use-cases/port/update-dapp.in-port";
import { DappRecord, DappResponse } from "@core/domain/types";
import { GetDappsInPort } from "../use-cases/port/get-dapps.in-port";

export class DappController {
  constructor(
    private readonly mapper: Mapper<DappEntity, DappRecord, DappResponse>,
    private readonly createDappUseCase: CreateDappInPort,
    private readonly updateDappUseCase: UpdateDappInPort,
    private readonly insertDappsUserCase: InsertDappsInPort,
    private readonly getDappsUseCase: GetDappsInPort
  ) {}

  createDapp(payload: CreateDappDto) {
    const dappEntity = this.createDappUseCase.execute(payload);
    return this.mapper.toResponse(dappEntity);
  }

  updateDapp(payload: UpdateDappDto) {
    const dappEntity = this.updateDappUseCase.execute(payload);
    return this.mapper.toResponse(dappEntity);
  }

  insertDapps(payload: DappRecord[][]) {
    const dataFlatMap = payload.flatMap((item) => item);
    const dappEntitys = dataFlatMap.map(this.mapper.toDomain);
    return this.insertDappsUserCase.execute(dappEntitys);
  }

  getDapps() {
    const dappEntitys = this.getDappsUseCase.execute();
    return dappEntitys.map(this.mapper.toResponse);
  }
}
