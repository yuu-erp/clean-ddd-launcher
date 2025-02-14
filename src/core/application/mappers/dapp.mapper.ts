import { UniqueEntityID } from "@core/domain/entities";
import { Mapper } from "./mapper.base";
import { DappEntity } from "@core/domain/entities/dapp.entity";
import { DappRecord, DappResponse } from "@core/domain/types/dapp.type";
import { DappPosition } from "@core/domain/value-objects";
import { DappTypeEnum } from "@core/domain/enums";

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

  toResponse(entity: DappEntity) {
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

  toPersistence(entity: DappEntity): DappRecord {
    return this.toResponse(entity);
  }
}
