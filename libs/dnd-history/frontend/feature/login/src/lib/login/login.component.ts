import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@dnd-history/shared-interfaces';
import {
  ADD_SESSION,
  AppState,
  selectSelectedSession,
  SELECT_SESSION,
} from '@dnd-history/frontend-state';
import { map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sessions$: Observable<Session[]> = this.store
    .select((state) => state.sessions)
    .pipe(map((sessions) => [...sessions].sort((a,b) => a.name.localeCompare(b.name))));
  sessionName = '';

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectSelectedSession).subscribe((selectedSession) => {
      this.sessionName = selectedSession?.name || '';
    });
  }

  submit(): void {
    this.sessions$
      .pipe(
        take(1),
        map((sessions) => {
          const byName = (s: Session) => s.name === this.sessionName;
          const existingSession = sessions.find(byName);
          if (existingSession) {
            this.store.dispatch({
              type: SELECT_SESSION,
              id: existingSession.id,
            });
            return;
          }
          const newSession: Session = {
            id: nanoid(),
            name: this.sessionName,
          };
          this.store.dispatch({ type: ADD_SESSION, entity: newSession });
          this.store.dispatch({ type: SELECT_SESSION, id: newSession.id });
        })
      )
      .subscribe(() => this.router.navigate(['/home']));
  }

  isLoginOrCreate(
    sessions: Session[],
    sessionName: string
  ): 'Login' | 'Create' {
    return sessions.find((s) => s.name === sessionName) ? 'Login' : 'Create';
  }

  onSessionNameChange(sessionName: string | null) {
    if (sessionName !== null) {
      this.sessionName = sessionName;
    }
  }
}
