import { Body, ConflictException, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';

import { SessionService } from './session.service';
import { UpdateResult } from 'typeorm';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('session')
  getSessions() {
    return this.sessionService.findAllSessions();
  }

  @Post('session')
  create(@Body() sessionDTO: SessionDTO): Promise<Session> {
    return this.sessionService.createSession(sessionDTO);
  }

  @Put('session/:id')
  update(
    @Param('id') id: number,
    @Body() sessionDTO: SessionDTO,
  ): Promise<UpdateResult> {
    return this.sessionService.updateSession(id, sessionDTO);
  }
}
