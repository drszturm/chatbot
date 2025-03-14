import { Sender } from '@core/enums/sender.enum';
import IMessageHandler from '../handlers/IMessageHandler';

export default interface IMessageHandlerFactory {
  create(sender: Sender): IMessageHandler;
}
