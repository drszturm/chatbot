import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class Logger {
  private static readonly logger = new NestLogger('Application'); // Define um contexto padrão

  static info(message: string, ...optionalParams: any[]): void {
    this.logger.log(message, ...optionalParams); // Usa o nível "log" do NestJS
  }

  static error(message: string, ...optionalParams: any[]): void {
    this.logger.error(message, ...optionalParams);
  }

  static warn(message: string, ...optionalParams: any[]): void {
    this.logger.warn(message, ...optionalParams);
  }

  static debug(message: string, ...optionalParams: any[]): void {
    this.logger.debug(message, ...optionalParams); // Adiciona suporte a logs de depuração
  }

  static verbose(message: string, ...optionalParams: any[]): void {
    this.logger.verbose(message, ...optionalParams); // Adiciona suporte a logs detalhados
  }
}