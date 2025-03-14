import { Injectable } from '@nestjs/common';
import IWhatsappApiService from '../interfaces/services/IWhatsappApiService';
import IMessageService from '../interfaces/services/IMessageService';
import { Sender } from 'domain/enums/sender.enum';
import IMessageHandlerFactory from '@application/interfaces/factories/IMessageHandlerFactory';
import IMessageHandler from '@application/interfaces/handlers/IMessageHandler';
import ClientMessageHandler from '@application/useCases/ClientMessage/clientMessage.handler';
import AttendeeMessageHandler from '@application/useCases/AttendeeMessage/attendeeMessage.handler';

Injectable();
export default class MessageHandlerFactory implements IMessageHandlerFactory {
  constructor(
    private readonly messagesRepository: IMessagesRepository,
    private readonly whatsappApi: IWhatsappApiService,
    private readonly messageService: IMessageService,
  ) {}

  private handlers = {
    [Sender.Attendee]: AttendeeMessageHandler,
    [Sender.Client]: ClientMessageHandler,
  };

  create(sender: Sender): IMessageHandler {
    const HandlerClass = this.handlers[sender];

    if (!HandlerClass) {
      throw new Error('Undefined strategy');
    }

    return new HandlerClass(
      this.messagesRepository,
      this.whatsappApi,
      this.messageService,
    );
  }
}
