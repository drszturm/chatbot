import { Group } from '@domain/entities/group.entity';

export interface IGroupsRepository {
  create(groupName: string, attendeePhone: string, clientPhone: string): void;
  getById(id: string): Promise<Group>;
}
