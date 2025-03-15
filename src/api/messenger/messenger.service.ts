import { Injectable } from '@nestjs/common';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import IMessageHandlerFactory from '@application/interfaces/factories/IMessageHandlerFactory';
import { Sender } from '@domain/enums/sender.enum';

@Injectable()
export class MessengerService {

  constructor(private readonly messageHandlerFactory: IMessageHandlerFactory) {}

  create(createMessengerDto: CreateMessengerDto) {
    return 'This action adds a new messenger';
  }

  findAll() {
    return `This action returns all messenger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messenger`;
  }

  update(id: number, updateMessengerDto: UpdateMessengerDto) {
    return `This action updates a #${id} messenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} messenger`;
  }

  async handleMessage(receivedMessage: ReceivedMessageDto){

    if(!receivedMessage) return;

    let senderType = receivedMessage.groupId ? Sender.Attendee : Sender.Client;

    const handler = this.messageHandlerFactory.create(senderType);

    await handler.execute(receivedMessage);
  }
}
