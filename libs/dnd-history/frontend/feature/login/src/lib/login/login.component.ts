import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@dnd-history/shared-interfaces';
import {
  AppState,
  selectSelectedSession,
  SessionService,
} from '@dnd-history/frontend-state';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { nanoid } from 'nanoid';
import { Store } from '@ngrx/store';
import { SELECT_SESSION } from '@dnd-history/frontend-state';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sessions$: Observable<Session[]> = this.sessionService.entities$;
  sessionName = '';

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select(selectSelectedSession).subscribe((selectedSession) => {
      this.sessionName = selectedSession?.name || '';
    });
  }

  submit(): void {
    this.sessions$
      .pipe(
        take(1),
        map((sessions) => sessions.find((s) => s.name === this.sessionName.trim())),
        switchMap((session) =>
          session
            ? of(session)
            : this.sessionService.add({
                id: nanoid(),
                name: this.sessionName.trim(),
              })
        ),
        map((session) =>
          this.store.dispatch({
            type: SELECT_SESSION.type,
            id: session.id,
          })
        ),
      )
      .subscribe(() => this.router.navigate(['/home']));
  }

  isLoginOrCreate(
    sessions: Session[],
    sessionName: string
  ): 'Login' | 'Create' {
    return sessions.find((s) => s.name === sessionName.trim()) ? 'Login' : 'Create';
  }

  onSessionNameChange(sessionName: string | null) {
    if (sessionName !== null) {
      this.sessionName = sessionName;
    }
  }
}
