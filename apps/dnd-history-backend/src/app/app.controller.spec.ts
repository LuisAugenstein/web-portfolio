import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { SessionService } from './session.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [SessionService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to dnd-history-backend!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getSessions()).toEqual({
        message: 'Welcome to dnd-history-backend!',
      });
    });
  });
});
