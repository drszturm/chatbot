import { Injectable } from '@nestjs/common';
import { messageStrategy } from '../enums/messagesStrategy.enum';
import IWhatsappApiService from '../interfaces/services/IWhatsappApiService';
import IMessageService from '../interfaces/services/IMessageService';
import AttendeeMessageHandler from './AttendeeMessage/attendeeMessage.handler';
import ClientMessageHandler from './ClientMessage/clientMessage.handler';

Injectable();
export default class ReceivedMessageUseCase {
  constructor(
    private readonly messagesRepository: IMessagesRepository,
    private readonly whatsappApi: IWhatsappApiService,
    private readonly messageService: IMessageService,
  ) {}

  async handle(message: ReceivedMessageDto, strategy: messageStrategy) {
    // TODO: identificar se a mensagem veio de dentro do group
    // se sim, a mensagem foi do atentende, enviar para para o cliente;

    let handler = null;

    switch (strategy) {
      case messageStrategy.Attendee:
        handler = new AttendeeMessageHandler(
          this.messagesRepository,
          this.whatsappApi,
          this.messageService,
        );
        break;
      case messageStrategy.Client:
        handler = new ClientMessageHandler(
          this.messagesRepository,
          this.whatsappApi,
          this.messageService,
        );
        break;
      default:
        throw new Error('Undefined strategy');
    }
    let entity = {
      message : message.message,
      phone: message.phone,
      groupId: message.groupId
    } as ReceivedMessage;

    return handler.handle(entity);
  }
}
''