import IMessageUseCase from './IMessage.useCase';

export interface IClientMessageUseCase
  extends IMessageUseCase<ReceivedMessageDto> {}
