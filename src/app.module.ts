import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessengerModule } from './messenger/messenger.module';
import { Twilio } from 'twilio';

@Module({
  imports: [MessengerModule,Twilio],
  controllers: [AppController],
  providers: [AppService],
  exports: [Twilio],
})
export class AppModule {}
