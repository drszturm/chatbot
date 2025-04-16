import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from '../entities/grupo.entity';
import { Repository } from 'typeorm';
import { Group } from '@domain/entities/group.entity';
import { GroupMapper } from '../mappers/Group.mappers';
import { IGroupsRepository } from '@domain/interfaces/repositories/IGroupsRepository';

@Injectable()
export class GroupsRepository implements IGroupsRepository {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly repository: Repository<GroupEntity>,
  ) {}

  create(groupName: string, attendeePhone: string, clientPhone: string): void {
    const group = this.repository.create({
      name: groupName,
      attendeePhone,
      clientPhone,
      botPhone: process.env.BOT_PHONE,
    });

    this.repository.save(group);
  }
  async getById(id: string): Promise<Group> {
    const entity = await this.repository.findOneByOrFail({
        id
    });
    return GroupMapper.toDomain(entity);
  }
}
