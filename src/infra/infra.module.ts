// src/infra/infra.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  IMessagesRepositoryToken,
} from '@domain/interfaces/repositories/IMessagesRepository';
import {
  IWhatsappAdapterToken,
} from '@application/interfaces/services/IWhatsappAdapter';
import { AttendeeEntity } from './persistence/entities/attendee.entity';
import { GroupEntity } from './persistence/entities/grupo.entity';
import { WhatsappAdapter } from './external-services/WhatsappAdapter';
import { WhatsappApiService, WhatsappApiServiceToken } from './external-services/WhatsappApiService';
import MessagesRepository from './persistence/repositories/messages.repository';

@Global()
@Module({
  imports: [
    // registra os repositórios do TypeORM
    TypeOrmModule.forFeature([AttendeeEntity, GroupEntity]),
  ],
  providers: [
    // provê MessagesRepository + token da interface
    MessagesRepository,
    { provide: IMessagesRepositoryToken, useExisting: MessagesRepository },

    // provê WhatsappApiService + token
    WhatsappApiService,
    { provide: WhatsappApiServiceToken, useExisting: WhatsappApiService },

    // provê WhatsappAdapter + token da interface
    WhatsappAdapter,
    { provide: IWhatsappAdapterToken, useExisting: WhatsappAdapter },
  ],
  exports: [
    // exports para qualquer módulo que importe (ou seja global)
    MessagesRepository,
    IMessagesRepositoryToken,

    WhatsappApiService,
    WhatsappApiServiceToken,

    WhatsappAdapter,
    IWhatsappAdapterToken,
  ],
})
export class InfraModule {}
