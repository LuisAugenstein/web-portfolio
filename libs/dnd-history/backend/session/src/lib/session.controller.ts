import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { Session } from '@dnd-history/shared-interfaces';

import { SessionService } from './session.service';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('sessions')
  getSessions() {
    return this.sessionService.findAll();
  }

  @Post('session')
  postSession(@Body() session: Session) {
    if (!this.sessionService.findOne(session)) {
      return new ConflictException();
    }
    this.sessionService.save(session)
  }
}
