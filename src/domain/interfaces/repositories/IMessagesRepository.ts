import { Attendee } from "@domain/entities/attendee.entity";
import { Group } from "@domain/entities/group.entity";

export const IMessagesRepositoryToken: string = "IMessagesRepository";
export interface IMessagesRepository {
  findAtteendeeByPhone(phone: string): Promise<Attendee>;
  findAttendeeByClientPhoneNumber(number: string): Promise<Attendee>;
  findGroupByClientPhone(phone: string): Promise<Group>;
  findGroupById(groupId: string): Promise<Group>;
  addGroup(newGroup: Group): void;
  
}
