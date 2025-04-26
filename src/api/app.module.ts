// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from '@infra/persistence/config/postgres.config';
import { InfraModule }        from '@infra/infra.module';
import { ApplicationModule }  from '@application/application.module';
import { CommonModule }       from '@common/common.module';
import { MessengerModule }    from './messenger/messenger.module';

import { AppController } from './app.controller';
import { AppService }    from './app.service';

@Module({
  imports: [
    // Abre a conexão com o banco
    TypeOrmModule.forRoot(databaseConfig),

    // Módulo global — registra e exporta IMessagesRepositoryToken
    InfraModule,

    // Módulos da aplicação
    ApplicationModule,
    CommonModule,
    MessengerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}