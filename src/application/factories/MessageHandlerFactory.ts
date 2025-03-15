import { Injectable } from '@nestjs/common';
import IWhatsappApiService from '../interfaces/services/IWhatsappApiService';
import IMessageService from '../interfaces/services/IMessageService';
import { Sender } from '@domain/enums/sender.enum';
import IMessageHandlerFactory from '@application/interfaces/factories/IMessageHandlerFactory';
import ClientMessageUseCase from '@application/useCases/ClientMessage/clientMessage.useCase';
import AttendeeMessageUseCase from '@application/useCases/AttendeeMessage/attendeeMessage.useCase';
import IMessageUseCase from '@domain/interfaces/useCases/IMessage.useCase';
import { IMessagesRepository } from '@application/interfaces/repositories/IMessageRepository';

Injectable();
export default class MessageHandlerFactory implements IMessageHandlerFactory {
  constructor(
    private readonly messagesRepository: IMessagesRepository,
    private readonly whatsappApi: IWhatsappApiService,
    private readonly messageService: IMessageService,
  ) {}

  private handlers = {
    [Sender.Attendee]: AttendeeMessageUseCase,
    [Sender.Client]: ClientMessageUseCase,
  };

  create(sender: Sender): IMessageUseCase<ReceivedMessage> {
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
