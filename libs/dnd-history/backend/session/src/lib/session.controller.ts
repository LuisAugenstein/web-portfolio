import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Session } from '@dnd-history/shared-interfaces';
import { SessionService } from './session.service';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('sessions')
  async read(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Post('session')
  create(@Body() session: Session): Promise<Session> {
    return this.sessionService.create(session);
  }

  @Put('session/:sessionId')
  update(
    @Param('sessionId') sessionId: string,
    @Body() session: Partial<Session>,
  ): Promise<Session> {
    return this.sessionService.update(sessionId, session);
  }
}
