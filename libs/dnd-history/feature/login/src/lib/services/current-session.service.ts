import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CurrentSessionService {
  private _currentSession = '';

  constructor(private cookieService: CookieService) {
    this._currentSession = this.cookieService.get('dnd-history-session');
  }

  get session() {
    return this._currentSession;
  }

  set session(session: string) {
    this.cookieService.set('dnd-history-session', session);
    this._currentSession = session;
  }
}
