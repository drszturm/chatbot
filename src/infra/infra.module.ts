import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './persistence/entities/grupo.entity';
import { GroupsRepository } from './persistence/repositories/groups.repository';
import { databaseConfig } from './persistence/config/postgres.config';
import MessagesRepository from './persistence/repositories/messages.repository';
import { IMessagesRepositoryToken } from '@domain/interfaces/repositories/IMessagesRepository';
import { TwillioAdapter } from './external-services/TwillioAdapter';
import { IWhatsappApiServiceToken } from '@application/interfaces/services/IWhatsappApiService';

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
      provide: IWhatsappApiServiceToken,
      useClass: TwillioAdapter,
    },
  ],
  exports: [
    GroupsRepository,
    IMessagesRepositoryToken,
    IWhatsappApiServiceToken
  ],
})
export class InfraModule {}
