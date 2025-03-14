import IMessageService from '@core/interfaces/services/IMessageService';
import IMessageHandler from '../../interfaces/handlers/IMessageHandler';
import AttendeeMessageValidator from './attendeeMessage.validator';
import IWhatsappApiService from '@core/interfaces/services/IWhatsappApiService';

export default class AttendeeMessageHandler implements IMessageHandler {
  constructor(
    private readonly messagesRepository: IMessagesRepository,
    private readonly whatsappApi: IWhatsappApiService,
    private readonly messageService: IMessageService,
  ) {}

  async handle(message: ReceivedMessage) {
    let validator = new AttendeeMessageValidator(message);

    if (!validator.isValid()) 
      throw new Error(validator.getErrors().join(';'));

    let attendee = await this.messagesRepository.findAtteendeeByPhone(
      message.phone,
    );

    let group = await this.messagesRepository.findGroupById(message.groupId);

    if (!group) {
      // busca grupo no wwp 
      let group = this.whatsappApi.getGroupById(message.externalId);

      // groupId inválido
      if(!group)
        throw new Error('Não existe grupo')
      
      let clientPhone = this.messageService.getClientNumberFromGroupName(group.name); 
      let client = { phoneNumber: clientPhone } as Client;

      await this.messageService.createGroup(message, attendee);

      // envia mensagem para o cliente
      message.text = `*${attendee.name}*: ${message.text}`;
      this.whatsappApi.forwardMessageToGroup(group, message.text);
      this.whatsappApi.forwardMessageToClient(client, message);
      return
    }

    // busca numero do cliente 
    let clientPhone = this.messageService.getClientNumberFromGroupName(group.name); 
    let client = { phoneNumber: clientPhone } as Client;

    // envaminha mensagem pro cliente
    message.text = `*${attendee.name}*: ${message.text}`;
    this.whatsappApi.forwardMessageToClient(client, message);
  }
}
