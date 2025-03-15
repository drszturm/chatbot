import { MessengerService } from './messenger.service';

describe('MessengerService', () => {
  let service: MessengerService;
  const messageHandlerMock = {
    execute: jest.fn(),
  };
  
  const messageHandlerFactoryMock = {
    create: jest.fn().mockReturnValue(messageHandlerMock),
  };
  
  
  beforeEach(async () => {
    service = new MessengerService(messageHandlerFactoryMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
