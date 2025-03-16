import { Sender } from '@domain/enums/sender.enum';
import IMessageUseCase from '@domain/interfaces/useCases/IMessage.useCase';

export const IMessageHandlerFactoryToken: string = "IMessageHandlerFactory";
export interface IMessageHandlerFactory {
  create(sender: Sender): IMessageUseCase<ReceivedMessage>;
}
