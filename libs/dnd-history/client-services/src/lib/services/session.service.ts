import { Injectable } from '@angular/core';
import { Session } from '@web-portfolio/dnd-history/data-access/api-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  sessions$ = this.httpClientService.get<Session[]>('sessions');
  private currentSession: Session;

  constructor(private cookieService: CookieService, private httpClientService: HttpClientService) {
    this.currentSession = this.loadCurrentSession();
  }

  getCurrentSession() {
    return this.currentSession;
  }

  setCurrentSession(session: Session) {
    this.cookieService.set('dnd-history-session', JSON.stringify(session));
    this.currentSession = session;
  }

  createNewSession(session: Session) {
    this.httpClientService.post('session', session).subscribe({error: console.log })
  }

  private loadCurrentSession(): Session {
    const session = this.cookieService.get('dnd-history-session');
    return session ? JSON.parse(session) : { name: '' };
  }
}
