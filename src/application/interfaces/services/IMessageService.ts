import { Group } from "@domain/entities/group.entity";

export const IMessageServiceToken: string = "IMessageService";
export interface IMessageService {
  findNextAttendance(): Attendance | PromiseLike<Attendance>;
  createGroup(
    message: ReceivedMessageDto,
    attendance: Attendance,
  ): Promise<Group>;

  getClientNumberFromGroupName(name): string;
}
