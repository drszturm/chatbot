import IMessageService from 'src/core/interfaces/services/IMessageService';
import IMessageHandler from '../../interfaces/IMessageHandler';
import IWhatsappApiService from 'src/core/interfaces/services/IWhatsappApiService';
import AttendeeMessageValidator from './attendeeMessage.validator';

export default class AttendeeMessageHandler implements IMessageHandler {
  constructor(
    private readonly messagesRepository: IMessagesRepository,
    private readonly whatsappApi: IWhatsappApiService,
    private readonly messageService: IMessageService,
  ) {}

  async handle(message: ReceivedMessage) {
    let validator = new AttendeeMessageValidator(message);

    if(!validator.isValid())
      throw new Error(validator.getErrors().join(';'));
    
    let group  = await this.messagesRepository.findGroupById(message.groupId);

    // TODO:  Continuar tratamento da mensagem do atendente
  }


}
