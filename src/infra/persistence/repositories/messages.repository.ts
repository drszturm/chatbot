import { IMessagesRepository } from '@application/interfaces/repositories/IMessageRepository';
import { Group } from '@domain/entities/group.entity';
import { Injectable, Scope } from '@nestjs/common';

// TODO: Implementar repository 
@Injectable({
  scope: Scope.TRANSIENT,
})
export default class MessagesRepository implements IMessagesRepository {
  findAtteendeeByPhone(phone: string): Promise<Attendance> {
    throw new Error('Method not implemented.');
  }
  findGroupById(groupId: string): Promise<Group> {
    throw new Error('Method not implemented.');
  }
  findGroupByClientPhone(phone: string): Promise<Group> {
    throw new Error('Method not implemented.');
  }
  findAttendeeByClientPhoneNumber(number: string): Promise<Attendance> {
    throw new Error('Method not implemented.');
  }
  addGroup(newGroup: Group): Promise<Group> {
    throw new Error('Method not implemented.');
  }
}
