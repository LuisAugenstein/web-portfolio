import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  sessions$ = this.http.get<Session[]>(`${environment.backendUrl}/sessions`);
  private currentSession: Session;

  constructor(private cookieService: CookieService, private http: HttpClient) {
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
    this.http
      .post(`${environment.backendUrl}/session`, session)
      .subscribe({ error: console.log });
  }

  private loadCurrentSession(): Session {
    const session = this.cookieService.get('dnd-history-session');
    return session ? JSON.parse(session) : { name: '' };
  }
}
