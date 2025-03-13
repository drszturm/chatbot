interface IMessagesRepository {
  findAttendeeByClientPhoneNumber(number: string): Promise<Attendance>;
  findGroupByClientPhone(phone: string): Promise<Group>;
  findGroupById(groupId: string): Promise<Group>;
  addGroup(newGroup: Group): Promise<Group>;
  
}
