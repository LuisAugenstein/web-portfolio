import { Injectable } from '@nestjs/common';
import { Session } from '@web-portfolio/dnd-history/data-access/api-interfaces';

@Injectable()
export class SessionService {
  private sessions: Session[] = [ { name: 'Avernus' },
  { name: 'Marlon/Michi' },
  { name: 'Noah Oneshot' }];

  getSessions(): Session[] {
    return this.sessions;
  }

  createSession(session: Session){
    this.sessions.push(session);
  }
}
