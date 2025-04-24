/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessengerModule } from './messenger/messenger.module';
import { Twilio } from 'twilio';
import { InfraModule } from '@infra/infra.module';
import { ApplicationModule } from '@application/application.module';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [
    InfraModule,
    ApplicationModule,    
    CommonModule,
    MessengerModule,
  ],

  controllers: [AppController],
  providers: [AppService],
  exports: [Twilio],
})
export class AppModule {}
