import { Test } from '@nestjs/testing';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [SessionService],
    }).compile();

    service = app.get<SessionService>(SessionService);
  });

  describe('getData', () => {
    it('should return "Welcome to dnd-history-backend!"', () => {
      expect(service.getSessions()).toEqual({
        message: 'Welcome to dnd-history-backend!',
      });
    });
  });
});
