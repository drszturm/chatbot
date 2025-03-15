import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import MessageHandlerFactory from './factories/MessageHandlerFactory';

@Module({
  imports: [CommonModule],
  providers: [MessageHandlerFactory],
  exports: [MessageHandlerFactory]
})
export class ApplicationModule {}
