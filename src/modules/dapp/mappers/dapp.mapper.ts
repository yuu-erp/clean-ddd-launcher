import { UniqueEntityID, DappEntity } from "@core/domain/entities";
import { DappRecord, DappResponse } from "@core/domain/types";
import { DappTypeEnum } from "@core/domain/enums";
import { Mapper } from "@core/application/mappers";
import { DappPosition } from "@core/domain/value-objects";
import { injectable } from "inversify";

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
