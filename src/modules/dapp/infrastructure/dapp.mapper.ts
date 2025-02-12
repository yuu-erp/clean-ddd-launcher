import { UniqueEntityID } from "@core/domain/entities";
import { Mapper } from "@core/application/mappers";
import { injectable } from "inversify";
import { DappEntity } from "../domain/entities/dapp.entity";
import {
  DappRecord,
  DappResponse,
  DappTypeEnum,
} from "../domain/entities/dapp.type";
import { DappPosition } from "../domain/value-objects/dapp-position.value-object";

@injectable()
export class DappMapper
  implements Mapper<DappEntity, DappRecord, DappResponse>
{
  toDomain(record: DappRecord): DappEntity {
    const position = new DappPosition({
      width: record.position.width,
      height: record.position.height,
      x: record.position.x,
      y: record.position.y,
    });
    const dApplicationEntity = new DappEntity({
      id: new UniqueEntityID(record.id),
      props: {
        ...record,
        position: position,
      },
    });
    return dApplicationEntity;
  }

  toPersistence(entity: DappEntity) {
    const props = entity.getProps();
    return {
      id: props.id,
      name: props.name,
      logo: props.logo,
      url: props.url,
      page: props.page,
      position: props.position.raw(),
      type: props.type as DappTypeEnum,
    };
  }

  toResponse(entity: DappEntity) {
    return this.toPersistence(entity);
  }
}
