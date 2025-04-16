/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessengerModule } from './messenger/messenger.module';
<<<<<<< HEAD:src/app.module.ts
import { Twilio } from 'twilio';

@Module({
  imports: [MessengerModule,Twilio],
=======
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
>>>>>>> 56652ab2af2228b8e61a7b261270ac1fa698346a:src/api/app.module.ts
  controllers: [AppController],
  providers: [AppService],
  exports: [Twilio],
})
export class AppModule {}
