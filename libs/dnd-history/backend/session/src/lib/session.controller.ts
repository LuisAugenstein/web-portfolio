import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Session } from '@dnd-history/shared-interfaces';

import { SessionService } from './session.service';
import { UpdateResult } from 'typeorm';
import { SessionEntity } from '@dnd-history/backend-entities';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('sessions')
  getSessions(): Promise<SessionEntity[]> {
    return this.sessionService.findAllSessions();
  }

  @Post('session')
  create(@Body() session: Session): Promise<Session> {
    return this.sessionService.createSession(session);
  }

  @Put('session/:sessionId')
  update(
    @Param('sessionId') sessionId: string,
    @Body() session: Partial<Session>,
  ): Promise<Session> {
    return this.sessionService.updateSession(sessionId, session);
  }
}
