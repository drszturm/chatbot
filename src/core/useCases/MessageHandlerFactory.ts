import { Injectable } from '@nestjs/common';
import IWhatsappApiService from '../interfaces/services/IWhatsappApiService';
import IMessageService from '../interfaces/services/IMessageService';
import AttendeeMessageHandler from './AttendeeMessage/attendeeMessage.handler';
import ClientMessageHandler from './ClientMessage/clientMessage.handler';
import { Sender } from '@core/enums/sender.enum';
import IMessageHandlerFactory from '@core/interfaces/factories/IMessageHandlerFactory';
import IMessageHandler from '@core/interfaces/handlers/IMessageHandler';

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
