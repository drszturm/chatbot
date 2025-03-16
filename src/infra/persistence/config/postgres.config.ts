import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // Carrega variáveis do .env

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{ts,js}'], // Ajuste conforme sua estrutura
  synchronize: true, // ⚠️ Não use em produção, pois recria tabelas automaticamente!
  logging: true,
};
