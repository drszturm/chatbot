import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export default class MessagesRepository implements IMessagesRepository {
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
