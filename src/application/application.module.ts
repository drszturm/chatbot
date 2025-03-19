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
    {
      provide: IMessageHandlerFactoryToken,
      useClass: MessageHandlerFactory,
    },
    {
      provide: IMessageServiceToken,
      useClass: MessageService,
    },
  ],
  exports: [
    IMessageHandlerFactoryToken,
    IMessageServiceToken
  ],
})
export class ApplicationModule {}
