import { Group } from "@domain/entities/group.entity";

export interface IMessagesRepository {
  findAtteendeeByPhone(phone: string): Promise<Attendance>;
  findAttendeeByClientPhoneNumber(number: string): Promise<Attendance>;
  findGroupByClientPhone(phone: string): Promise<Group>;
  findGroupById(groupId: string): Promise<Group>;
  addGroup(newGroup: Group): Promise<Group>;
  
}
