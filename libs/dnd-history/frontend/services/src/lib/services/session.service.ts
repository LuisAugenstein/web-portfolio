import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { Observable} from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root',
})
export class SessionService {
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

  readSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${environment.backendUrl}/session`);
  }

  createSession(sessionDTO: SessionDTO): Observable<Session> {
    return this.http.post(
      `${environment.backendUrl}/session`,
      sessionDTO
    ) as Observable<Session>;
  }

  private loadCurrentSession(): Session {
    const session = this.cookieService.get('dnd-history-session');
    return session ? JSON.parse(session) : { id: -1, name: '' };
  }
}
