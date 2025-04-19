/* istanbul ignore file */
import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './persistence/entities/grupo.entity';
import { GroupsRepository } from './persistence/repositories/groups.repository';
import { databaseConfig } from './persistence/config/postgres.config';
import MessagesRepository from './persistence/repositories/messages.repository';
import { IMessagesRepositoryToken } from '@domain/interfaces/repositories/IMessagesRepository';
import { WhatsappAdapter } from './external-services/WhatsappAdapter';
import { IWhatsappAdapterToken } from '@application/interfaces/services/IWhatsappAdapter';

@Module({
  imports: [
    CommonModule, 
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([GroupEntity])],
  providers: [
    GroupsRepository,
    {
      provide: IMessagesRepositoryToken,
      useClass: MessagesRepository,
    },
    {
      provide: IWhatsappAdapterToken,
      useClass: WhatsappAdapter,
    },
  ],
  exports: [
    GroupsRepository,
    IMessagesRepositoryToken,
    IWhatsappAdapterToken
  ],
})
export class InfraModule {}
