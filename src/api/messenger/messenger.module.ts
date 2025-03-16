import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import MessagesRepository from '../../infra/persistence/repositories/messages.repository';
import { ApplicationModule } from '@application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [MessengerController],
  providers: [
    MessengerService, 
    MessagesRepository],
})
export class MessengerModule {}
