import { Logger } from "./Logger";

export class GlobalExceptionHandler {
  static initialize(): void {
    process.on('uncaughtException', (error) => {
      Logger.error('Uncaught Exception:', error);
    });

    process.on('unhandledRejection', (reason, promise) => {
      Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('SIGINT', () => {
      Logger.info('Process terminated (SIGINT)');
      process.exit(0);
    });
  }
}