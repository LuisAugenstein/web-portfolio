import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessions: string[] = ['Avernus', 'Marlon/Michi', 'Noah Oneshot'];

  getSessions(){
    return this.sessions;
  }

  createNewSession(session: string) {
    this.sessions.push(session);
    console.log('TODO: send to server that we created a new session ');
  }

  sessionExists(session: string | undefined){
    return session !== undefined && this.sessions.includes(session);
  }

}
