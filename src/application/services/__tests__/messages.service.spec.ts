process.env.BOT_PHONE = "123456789";

import { Test, TestingModule } from '@nestjs/testing';
import MessageService from '../messages.service';
import { IMessagesRepository, IMessagesRepositoryToken } from '@domain/interfaces/repositories/IMessagesRepository';
import { IWhatsappApiService, IWhatsappApiServiceToken } from '@application/interfaces/services/IWhatsappApiService';
import { Attendee } from '@domain/entities/attendee.entity';
import { Group } from '@domain/entities/group.entity';

describe('MessageService', () => {
    let messageService: MessageService;
    let messagesRepositoryMock: jest.Mocked<IMessagesRepository>;
    let whatsappApiMock: jest.Mocked<IWhatsappApiService>;

    beforeEach(async () => {
        messagesRepositoryMock = {
            addGroup: jest.fn(),
        } as unknown as jest.Mocked<IMessagesRepository>;

        whatsappApiMock = {
            createGroup: jest.fn(),
        } as unknown as jest.Mocked<IWhatsappApiService>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageService,
                { provide: IMessagesRepositoryToken, useValue: messagesRepositoryMock },
                { provide: IWhatsappApiServiceToken, useValue: whatsappApiMock },
            ],
        }).compile();

        messageService = module.get<MessageService>(MessageService);
        process.env.BOT_PHONE = '123456789'; // Mock environment variable
    });

    it('should create a group and save it in the repository', async () => {
        const message = { phone: '987654321' } as any; // Mock ReceivedMessageDto
        const attendee = { id: '1', attendeePhone: '123456789', name: "Attendee" } as unknown as Attendee;

        const expectedGroup: Group = {
            name: '1#XXX - 987654321',
            attendeePhone: '123456789',
            botPhone: '123456789',
            clientPhone: '987654321',
        } as Group;

        whatsappApiMock.createGroup.mockResolvedValue(undefined);
        messagesRepositoryMock.addGroup.mockResolvedValue({} as never);

        const result = await messageService.createGroup(message, attendee);

        expect(result).toEqual(expectedGroup);
        expect(whatsappApiMock.createGroup).toHaveBeenCalledWith(expectedGroup);
        expect(messagesRepositoryMock.addGroup).toHaveBeenCalledWith(expectedGroup);
    });
});