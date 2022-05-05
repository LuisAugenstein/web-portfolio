import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { Session } from '@web-portfolio/dnd-history/data-access/api-interfaces';

import { SessionService } from './session.service';

@Controller()
export class AppController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('sessions')
  getSessions() {
    return this.sessionService.getSessions();
  }

  @Post('session')
  postSession(@Body() session: Session){
    if(this.sessionService.getSessions().includes(session)){
      return new ConflictException();
    }
    return this.sessionService.createSession(session);
  }

}
