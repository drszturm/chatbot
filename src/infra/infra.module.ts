import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './persistence/entities/grupo.entity';
import { GroupsRepository } from './persistence/repositories/groups.repository';
import { databaseConfig } from './persistence/config/postgres.config';

@Module({
  imports: [
    CommonModule, 
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([GroupEntity])],
  providers: [GroupsRepository],
  exports: [GroupsRepository],
})
export class InfraModule {}
