export default interface IMessageService {
  findNextAttendance(): Attendance | PromiseLike<Attendance>;
  createGroup(
    message: ReceivedMessageDto,
    attendance: Attendance,
  ): Promise<Group>;
}
