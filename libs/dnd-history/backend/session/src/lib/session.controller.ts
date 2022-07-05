import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Session } from '@dnd-history/shared-interfaces';

import { SessionService } from './session.service';
import { UpdateResult } from 'typeorm';
import { SessionEntity } from '@dnd-history/backend-entities';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('session')
  getSessions(): Promise<SessionEntity[]> {
    return this.sessionService.findAllSessions();
  }

  @Post('session')
  async create(@Body() session: Session): Promise<void> {
    this.sessionService.createSession(session);
  }

  @Put('session/:sessionId')
  update(
    @Param('sessionId') sessionId: string,
    @Body() session: Partial<Session>,
  ): Promise<UpdateResult> {
    return this.sessionService.updateSession(sessionId, session);
  }
}
