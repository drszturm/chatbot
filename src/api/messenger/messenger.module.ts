import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { InfraModule } from '@infra/infra.module';
import { ApplicationModule } from '@application/application.module';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';

@Module({
  imports: [
    CommonModule,
    InfraModule,
    // importa o ApplicationModule para trazer o IMessageHandlerFactoryToken
    ApplicationModule,
  ],
  controllers: [
    MessengerController,
  ],
  providers: [
    // aqui só o próprio Service — o factory vem via ApplicationModule
    MessengerService,
  ],
})
export class MessengerModule {}