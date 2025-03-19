import { Group } from '@domain/entities/group.entity';
import { GroupEntity } from '../entities/grupo.entity';

export class GroupMapper {
  static toDomain(entity: GroupEntity): Group {
    return new Group(
      entity.id,
      entity.name,
      entity.attendeePhone,
      entity.clientPhone,
      entity.botPhone,
    );
  }

  static toEntity(domain: Group): GroupEntity {
    const entity = new GroupEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.attendeePhone = domain.attendeePhone;
    entity.clientPhone = domain.clientPhone;
    entity.botPhone = domain.botPhone;
    return entity;
  }
}
