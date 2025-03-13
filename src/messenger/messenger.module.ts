import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import MessagesRepository from './repositories/messages.repository';

@Module({
  controllers: [MessengerController],
  providers: [
    MessengerService, 
    MessagesRepository],
})
export class MessengerModule {}
