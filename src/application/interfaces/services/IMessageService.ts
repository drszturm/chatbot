import { Attendee } from "@domain/entities/attendee.entity";
import { Group } from "@domain/entities/group.entity";

export const IMessageServiceToken: string = "IMessageService";
export interface IMessageService {
  findNextAttendance(): Attendee | PromiseLike<Attendee>;
  createGroup(
    message: ReceivedMessageDto,
    attendance: Attendee,
  ): Promise<Group>;

  getClientNumberFromGroupName(name): string;
}
