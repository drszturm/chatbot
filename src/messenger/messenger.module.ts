import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { Twilio } from 'twilio';

@Module({
  imports: [Twilio],
  controllers: [MessengerController],
  providers: [MessengerService],
})
export class MessengerModule {}
