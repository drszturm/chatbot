import { Test, TestingModule } from '@nestjs/testing';
import ClientMessageUseCase from '../ClientMessage/clientMessage.useCase';
import ClientMessageValidator from '../ClientMessage/clientMessage.validator';
import { messagesRepositoryMock } from './mocks/messageRepository.mock';
import { messageServiceMock } from './mocks/messageService.mock';
import { whatsappApiMock } from './mocks/whatsappApi.mock';


describe('ClientMessageUseCase', () => {
  let handler: ClientMessageUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientMessageUseCase,
        { provide: 'IMessagesRepository', useValue: messagesRepositoryMock },
        { provide: 'IWhatsappAdapter', useValue: whatsappApiMock },
        { provide: 'IMessageService', useValue: messageServiceMock },
      ],
    }).compile();

    handler = new ClientMessageUseCase(messagesRepositoryMock, whatsappApiMock, messageServiceMock);

  });

  it('should throw an error if the validator fails', async () => {
    const message = { phone: '12345', text: 'Hello' };
    jest.spyOn(ClientMessageValidator.prototype, 'isValid').mockReturnValue(false);
    jest.spyOn(ClientMessageValidator.prototype, 'getErrors').mockReturnValue(['Invalid message']);

    await expect(handler.execute(message)).rejects.toThrow('Invalid message');
  });

  it('should forward the message to an existing group', async () => {
    const message = { phone: '12345', text: 'Hello' };
    const group = { id: 'group1' };
    jest.spyOn(ClientMessageValidator.prototype, 'isValid').mockReturnValue(true);
    messagesRepositoryMock.findGroupByClientPhone.mockResolvedValue(group);

    await handler.execute(message);

    expect(whatsappApiMock.forwardMessageToGroup).toHaveBeenCalledWith(group, message);
  });

  it('should create a new group if no group exists but an attendee is found', async () => {
    const message = { phone: '12345', text: 'Hello' };
    const attendee = { id: 'attendee1' };
    const group = { id: 'group1' };
    jest.spyOn(ClientMessageValidator.prototype, 'isValid').mockReturnValue(true);
    messagesRepositoryMock.findGroupByClientPhone.mockResolvedValue(null);
    messagesRepositoryMock.findAttendeeByClientPhoneNumber.mockResolvedValue(attendee);
    messageServiceMock.createGroup.mockResolvedValue(group);

    await handler.execute(message);

    expect(messageServiceMock.createGroup).toHaveBeenCalledWith(message, attendee);
    expect(whatsappApiMock.forwardMessageToGroup).toHaveBeenCalledWith(group, message);
  });

  it('should assign a new attendee and create a group if no group or attendee exists', async () => {
    const message = { phone: '12345', text: 'Hello' };
    const attendee = { id: 'attendee1' };
    const group = { id: 'group1' };
    jest.spyOn(ClientMessageValidator.prototype, 'isValid').mockReturnValue(true);
    messagesRepositoryMock.findGroupByClientPhone.mockResolvedValue(null);
    messagesRepositoryMock.findAttendeeByClientPhoneNumber.mockResolvedValue(null);
    messageServiceMock.findNextAttendance.mockResolvedValue(attendee);
    messageServiceMock.createGroup.mockResolvedValue(group);

    await handler.execute(message);

    expect(messageServiceMock.findNextAttendance).toHaveBeenCalled();
    expect(messageServiceMock.createGroup).toHaveBeenCalledWith(message, attendee);
    expect(whatsappApiMock.forwardMessageToGroup).toHaveBeenCalledWith(group, message);
  });
});