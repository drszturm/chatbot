import IMessageService from '@application/interfaces/services/IMessageService';
import IWhatsappApiService from '@application/interfaces/services/IWhatsappApiService';
import MessagesRepository from '../../../infra/persistence/messages.repository';

export default class MessageService implements IMessageService {
  private MAIN_NUMBER: string = process.env.BOT_NUMBER;

  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly whatsappApi: IWhatsappApiService,
  ) {}

  findNextAttendance(): Attendance | PromiseLike<Attendance> {
    // TODO: Implementar a seguinte regra
    // O atendente que tem menos grupos cadastrados é o próximo;
    throw new Error('Method not implemented.');
  }

  async createGroup(
    message: ReceivedMessageDto,
    attendance: Attendance,
  ): Promise<Group> {
    let name = `${attendance.Id}#XXX - ${message.phone}`;
    let members = [attendance.phone, this.MAIN_NUMBER];
    let newGroup = { name, members } as Group;
    this.whatsappApi.createGroup(newGroup);

    // salva no banco
    newGroup.groupId = (
      await this.messagesRepository.addGroup(newGroup)
    ).groupId;
    return newGroup;
  }

  getClientNumberFromGroupName(name): string | null {
    const regex = /\d{2,}$/;

    const match = name.match(regex);
    return match ? match[0] : null;
  }
}
