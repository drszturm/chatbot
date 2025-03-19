import { IMessagesRepository } from '@domain/interfaces/repositories/IMessagesRepository';
import { Group } from '@domain/entities/group.entity';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from '../entities/grupo.entity';
import { Repository } from 'typeorm';
import { AttendeeEntity } from '../entities/attendee.entity';
import { AttendeeMapper } from '../mappers/attendee.mappers';
import { Attendee } from '@domain/entities/attendee.entity';
import { GroupMapper } from '../mappers/Group.mappers';

// TODO: Implementar repository
@Injectable({
  scope: Scope.TRANSIENT,
})
export default class MessagesRepository implements IMessagesRepository {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,

    @InjectRepository(AttendeeEntity)
    private readonly attendeeRepository: Repository<AttendeeEntity>,
  ) {}

  async findAtteendeeByPhone(phone: string): Promise<Attendee> {
    let attendee = await this.attendeeRepository.findOneOrFail({
      where: {
        phone,
      },
    });
    
    return AttendeeMapper.toDomain(attendee);
  }

  async findGroupById(groupId: string): Promise<Group> {
    let entity = await this.groupRepository.findOneByOrFail({
      id: groupId,
    });

    return GroupMapper.toDomain(entity);
  }

  async findGroupByClientPhone(phone: string): Promise<Group> {
    let entity = await this.groupRepository.findOneByOrFail({
      clientPhone: phone,
    });

    return GroupMapper.toDomain(entity);
  }

  async findAttendeeByClientPhoneNumber(phone: string): Promise<Attendee> {
    let group = await this.groupRepository.findOneByOrFail({
      active: true,
      clientPhone: phone,
    });

    if (!group) return null;

    let attendee = await this.attendeeRepository.findOneByOrFail({
      id: group.attendee.id,
    });

    return AttendeeMapper.toDomain(attendee);
  }

  async addGroup(newGroup: Group): Promise<void> {
    let entity = GroupMapper.toEntity(newGroup);
    await this.groupRepository.insert(entity);
  }
}
