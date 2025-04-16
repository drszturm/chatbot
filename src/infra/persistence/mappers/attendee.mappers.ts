import { AttendeeEntity } from '../entities/attendee.entity';
import { Attendee } from '@domain/entities/attendee.entity';

export class AttendeeMapper {
  static toDomain(entity: AttendeeEntity): Attendee {
    return new Attendee(entity.id, entity.first_name, '');
  }

  static toEntity(domain: Attendee): AttendeeEntity {
    const entity = new AttendeeEntity();
    entity.id = domain.id;
    entity.first_name = domain.name;
    entity.phone = domain.attendeePhone;
    return entity;
  }
}
