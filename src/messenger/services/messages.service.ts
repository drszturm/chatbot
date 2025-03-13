import IMessageService from '../../core/interfaces/services/IMessageService';
import IWhatsappApiService from '../../core/interfaces/services/IWhatsappApiService';
import MessagesRepository from '../repositories/messages.repository';

export default class MessageService implements IMessageService {
  // TODO: Mover para env;
  private MAIN_NUMBER: string = '11999999999';

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
    let members = [attendance.phone, message.phone, this.MAIN_NUMBER];
    let newGroup = { name, members } as Group;
    this.whatsappApi.createGroup(newGroup);

    // salva no banco
    newGroup.groupId = (await this.messagesRepository.addGroup(newGroup)).groupId;
    return newGroup;
  }
}
