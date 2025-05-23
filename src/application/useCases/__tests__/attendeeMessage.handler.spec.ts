import { Test, TestingModule } from '@nestjs/testing';
import AttendeeMessageUseCase from '../AttendeeMessage/attendeeMessage.useCase';
import AttendeeMessageValidator from '../AttendeeMessage/attendeeMessage.validator';
import { messagesRepositoryMock } from './mocks/messageRepository.mock';
import { messageServiceMock } from './mocks/messageService.mock';
import { whatsappApiMock } from './mocks/whatsappApi.mock';

describe('AttendeeMessageUseCase', () => {
  let handler: AttendeeMessageUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendeeMessageUseCase,
        { provide: 'IMessagesRepository', useValue: messagesRepositoryMock },
        { provide: 'IWhatsappAdapter', useValue: whatsappApiMock },
        { provide: 'IMessageService', useValue: messageServiceMock },
      ],
    }).compile();

    handler = new AttendeeMessageUseCase(messagesRepositoryMock, whatsappApiMock, messageServiceMock);
  });

  it('should throw an error if the message is invalid', async () => {
    const invalidMessage = { phone: '', groupId: '', text: '' }; // Example invalid message
    jest.spyOn(AttendeeMessageValidator.prototype, 'isValid').mockReturnValue(false);
    jest.spyOn(AttendeeMessageValidator.prototype, 'getErrors').mockReturnValue(['Invalid message']);

    await expect(handler.execute(invalidMessage as any)).rejects.toThrow('Invalid message');
  });

  it('should throw an error if group does not exist and externalId is invalid', async () => {
    const message = { phone: '123456789', groupId: 'invalidGroupId', externalId: 'invalidExternalId', text: 'Hello' };
    jest.spyOn(AttendeeMessageValidator.prototype, 'isValid').mockReturnValue(true);
    jest.spyOn(messagesRepositoryMock, 'findGroupById').mockResolvedValue(null);
    jest.spyOn(whatsappApiMock, 'getGroupById').mockReturnValue(null);

    await expect(handler.execute(message as ReceivedMessage)).rejects.toThrow('Não existe grupo');
  });

  it('should create a group and forward the message if group does not exist but externalId is valid', async () => {
    const message = { phone: '123456789', groupId: 'invalidGroupId', externalId: 'validExternalId', text: 'Hello' };
    const group = { name: 'Group Name' };
    const attendee = { name: 'Attendee Name' };
    const client = { phoneNumber: '987654321' };

    jest.spyOn(messagesRepositoryMock, 'findGroupById').mockResolvedValue(null);
    jest.spyOn(whatsappApiMock, 'getGroupById').mockReturnValue(group);
    jest.spyOn(messageServiceMock, 'getClientNumberFromGroupName').mockReturnValue(client.phoneNumber);
    jest.spyOn(messagesRepositoryMock, 'findAtteendeeByPhone').mockResolvedValue(attendee);
    jest.spyOn(messageServiceMock, 'createGroup').mockResolvedValue(undefined);
    jest.spyOn(whatsappApiMock, 'forwardMessageToGroup').mockResolvedValue(undefined);
    jest.spyOn(whatsappApiMock, 'forwardMessageToClient').mockResolvedValue(undefined);

    await handler.execute(message as any);

    expect(messageServiceMock.createGroup).toHaveBeenCalledWith(message, attendee);
    expect(whatsappApiMock.forwardMessageToGroup).toHaveBeenCalledWith(group, message);
    expect(whatsappApiMock.forwardMessageToClient).toHaveBeenCalledWith(client, group, message);
  });

  it('should forward the message to the client if group exists', async () => {
    const message = { phone: '123456789', groupId: 'validGroupId', text: 'Hello' };
    const group = { name: 'Group Name' };
    const attendee = { name: 'Attendee Name' };
    const client = { phoneNumber: '987654321' };

    jest.spyOn(messagesRepositoryMock, 'findGroupById').mockResolvedValue(group);
    jest.spyOn(messageServiceMock, 'getClientNumberFromGroupName').mockReturnValue(client.phoneNumber);
    jest.spyOn(messagesRepositoryMock, 'findAtteendeeByPhone').mockResolvedValue(attendee);
    jest.spyOn(whatsappApiMock, 'forwardMessageToClient').mockResolvedValue(undefined);

    await handler.execute(message as any);

    expect(whatsappApiMock.forwardMessageToClient).toHaveBeenCalledWith(client, group, {
      ...message,
      text: "*Attendee Name*: Hello",
    });
  });
});