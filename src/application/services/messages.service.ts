import { IMessageService } from '@application/interfaces/services/IMessageService';
import { IWhatsappApiService, IWhatsappApiServiceToken } from '@application/interfaces/services/IWhatsappApiService';
import { Attendee } from '@domain/entities/attendee.entity';
import { Group } from '@domain/entities/group.entity';
import { IMessagesRepository, IMessagesRepositoryToken } from '@domain/interfaces/repositories/IMessagesRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class MessageService implements IMessageService {
  private MAIN_NUMBER: string = process.env.BOT_PHONE;

  constructor(
    @Inject(IMessagesRepositoryToken)
    private readonly messagesRepository: IMessagesRepository,
    
    @Inject(IWhatsappApiServiceToken)
    private readonly whatsappApi: IWhatsappApiService,
  ) {}

  findNextAttendance(): Attendee | PromiseLike<Attendee> {
    // TODO: Implementar a seguinte regra
    // O atendente que tem menos grupos cadastrados é o próximo;
    throw new Error('Method not implemented.');
  }

  async createGroup(
    message: ReceivedMessageDto,
    attendee: Attendee,
  ): Promise<Group> {
    let name = `${attendee.id}#XXX - ${message.phone}`;
    let newGroup = {
      name,
      attendeePhone: attendee.attendeePhone,
      botPhone: this.MAIN_NUMBER,
      clientPhone: message.phone,
    } as Group;
    this.whatsappApi.createGroup(newGroup);

    // salva no banco
    await this.messagesRepository.addGroup(newGroup);
    return newGroup;
  }

  getClientNumberFromGroupName(name): string | null {
    const regex = /\d{2,}$/;

    const match = name.match(regex);
    return match ? match[0] : null;
  }
}
