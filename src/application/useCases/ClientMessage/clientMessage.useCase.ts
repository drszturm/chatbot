import IWhatsappApiService from '@application/interfaces/services/IWhatsappApiService';
import IMessageService from '@application/interfaces/services/IMessageService';
import ClientMessageValidator from './clientMessage.validator';
import { IClientMessageUseCase } from '@domain/interfaces/useCases/IClientMessage.useCase';
import { IMessagesRepository } from '@application/interfaces/repositories/IMessageRepository';

export default class ClientMessageUseCase implements IClientMessageUseCase {
  constructor(
    private readonly messagesRepository: IMessagesRepository,
    private readonly whatsappApi: IWhatsappApiService,
    private readonly messageService: IMessageService,
  ) {}

  async execute(message: ReceivedMessage) {
    const validator = new ClientMessageValidator(message);
    if (!validator.isValid()) throw new Error(validator.getErrors().join(';'));

    // busca grupo existente por telefone
    let group = await this.messagesRepository.findGroupByClientPhone(
      message.phone,
    );

    if (group) {
      // se existe, encaminha a mensagem no grupo
      this.whatsappApi.forwardMessageToGroup(group, message.text);
      return;
    }

    // buscar atendente cadastrado
    let attendee =
      await this.messagesRepository.findAttendeeByClientPhoneNumber(
        message.phone,
      );

    if (attendee) {
      // tem atendente cadastrado e não tem grupo (Não achou na query de cima)
      // cria um novo grupo
      group = await this.messageService.createGroup(message, attendee);

      // Encaminha a mensgem no grupo
      this.whatsappApi.forwardMessageToGroup(group, message.text);
      return;
    }

    // se não tem atendente, busca um novo
    attendee = await this.messageService.findNextAttendance();

    // cria o grupo
    group = await this.messageService.createGroup(message, attendee);

    // Encaminha a mensgem no grupo
    this.whatsappApi.forwardMessageToGroup(group, message.text);
  }
}
