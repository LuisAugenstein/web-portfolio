import { Injectable } from '@angular/core';
import { Session } from '@web-portfolio/dnd-history/data-access/api-interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessions: Session[];
  private currentSession: Session;

  constructor(private cookieService: CookieService){
    this.sessions = this.loadSessions();
    this.currentSession = this.loadCurrentSession();
  }

  getSessions() {
    return this.sessions;
  }

  getCurrentSession(){
    return this.currentSession;
  }

  setCurrentSession(session: Session){
    if(!this.doesSessionExis(session)){
      throw Error(`The session "${session}" does not exist. Please create it first.`);
    }
    this.cookieService.set('dnd-history-session', JSON.stringify(session));
    this.currentSession = session;
  }

  createNewSession(session: Session) {
    if(this.doesSessionExis(session)){
      throw Error(`The session "${session}" cannot be created as it already exists.`);
    }
    this.sessions.push(session);
    console.log('TODO: send to server that we created a new session ');
  }

  doesSessionExis(session: Session) {
    return this.sessions.map(s => s.name).includes(session.name);
  }


  private loadSessions(): Session[]{
    console.log('access database and get possible sessions');
    return [
      { name: 'Avernus' },
      { name: 'Marlon/Michi' },
      { name: 'Noah Oneshot' },
    ];
  }

  private loadCurrentSession(): Session{
    const session = this.cookieService.get('dnd-history-session');
    return session ? JSON.parse(session) : { name: '' };
  }
}
