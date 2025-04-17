import { Test, TestingModule } from '@nestjs/testing';
import MessageHandlerFactory from '../MessageHandlerFactory';
import { Sender } from '@domain/enums/sender.enum';
import { IMessagesRepository, IMessagesRepositoryToken } from '@domain/interfaces/repositories/IMessagesRepository';
import { IWhatsappAdapter, IWhatsappAdapterToken } from '../../interfaces/services/IWhatsappAdapter';
import { IMessageService, IMessageServiceToken } from '../../interfaces/services/IMessageService';
import ClientMessageUseCase from '@application/useCases/ClientMessage/clientMessage.useCase';
import AttendeeMessageUseCase from '@application/useCases/AttendeeMessage/attendeeMessage.useCase';

describe('MessageHandlerFactory', () => {
    let factory: MessageHandlerFactory;
    let messagesRepositoryMock: IMessagesRepository;
    let whatsappApiMock: IWhatsappAdapter;
    let messageServiceMock: IMessageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageHandlerFactory,
                {
                    provide: IMessagesRepositoryToken,
                    useValue: {},
                },
                {
                    provide: IWhatsappAdapterToken,
                    useValue: {},
                },
                {
                    provide: IMessageServiceToken,
                    useValue: {},
                },
            ],
        }).compile();

        factory = module.get<MessageHandlerFactory>(MessageHandlerFactory);
        messagesRepositoryMock = module.get<IMessagesRepository>(IMessagesRepositoryToken);
        whatsappApiMock = module.get<IWhatsappAdapter>(IWhatsappAdapterToken);
        messageServiceMock = module.get<IMessageService>(IMessageServiceToken);
    });

    it('should create a ClientMessageUseCase when sender is Client', () => {
        const useCase = factory.create(Sender.Client);

        expect(useCase).toBeInstanceOf(ClientMessageUseCase);
        expect((useCase as any).messagesRepository).toBe(messagesRepositoryMock);
        expect((useCase as any).whatsappApi).toBe(whatsappApiMock);
        expect((useCase as any).messageService).toBe(messageServiceMock);
    });

    it('should create an AttendeeMessageUseCase when sender is Attendee', () => {
        const useCase = factory.create(Sender.Attendee);

        expect(useCase).toBeInstanceOf(AttendeeMessageUseCase);
        expect((useCase as any).messagesRepository).toBe(messagesRepositoryMock);
        expect((useCase as any).whatsappApi).toBe(whatsappApiMock);
        expect((useCase as any).messageService).toBe(messageServiceMock);
    });

    it('should throw an error when sender is undefined', () => {
        expect(() => factory.create(null)).toThrow('Undefined strategy');
    });
});