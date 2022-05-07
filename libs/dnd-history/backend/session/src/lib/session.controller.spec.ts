import { Test, TestingModule } from '@nestjs/testing';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [SessionService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to dnd-history-backend!"', () => {
      const appController = app.get<SessionController>(SessionController);
      expect(appController.getSessions()).toEqual({
        message: 'Welcome to dnd-history-backend!',
      });
    });
  });
});
