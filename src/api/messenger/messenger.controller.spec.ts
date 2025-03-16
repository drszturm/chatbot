import { MessengerController } from './messenger.controller';
import { MessengerService } from './messenger.service';

describe('MessengerController', () => {
  let controller: MessengerController;
  const messageHandlerMock = {
    execute: jest.fn(),
  };
  
  const messageHandlerFactoryMock = {
    create: jest.fn().mockReturnValue(messageHandlerMock),
  };
  
  beforeEach(async () => {
    controller = new MessengerController(
      new MessengerService(messageHandlerFactoryMock)
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
