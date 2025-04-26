/* istanbul ignore file */
import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import MessageHandlerFactory from './factories/MessageHandlerFactory';
import {IMessageHandlerFactoryToken} from '@application/interfaces/factories/IMessageHandlerFactory';
import { InfraModule } from '@infra/infra.module';
import { IMessageServiceToken } from './interfaces/services/IMessageService';
import MessageService from './services/messages.service';

@Module({
  imports: [
    CommonModule,
    InfraModule
  ],
  providers: [
    MessageHandlerFactory,
    {
      provide: IMessageHandlerFactoryToken,
      useClass: MessageHandlerFactory,
    },
    MessageService,
    {
      provide: IMessageServiceToken,
      useClass: MessageService,
    },
  ],
  exports: [
    IMessageHandlerFactoryToken,
    MessageHandlerFactory,
    IMessageServiceToken,
    MessageService
  ],
})
export class ApplicationModule {}
