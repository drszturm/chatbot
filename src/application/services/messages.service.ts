import { IMessageService } from '@application/interfaces/services/IMessageService';
import { IWhatsappAdapter, IWhatsappAdapterToken } from '@application/interfaces/services/IWhatsappAdapter';
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
    
    @Inject(IWhatsappAdapterToken)
    private readonly whatsappApi: IWhatsappAdapter,
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
    let name = `${attendee.id}#XXX - ${message.key.remoteJid}`;
    let newGroup = {
      name,
      attendeePhone: attendee.attendeePhone,
      botPhone: this.MAIN_NUMBER,
      clientPhone: message.key.remoteJid,
    } as Group;

    let id = await this.whatsappApi.createGroup(newGroup);

    newGroup.id = id;
    // salva no banco
    this.messagesRepository.addGroup(newGroup);
    return newGroup;
  }

  getClientNumberFromGroupName(name): string | null {
    const regex = /\d{2,}$/;

    const match = name.match(regex);
    return match ? match[0] : null;
  }
}
