import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import {
  HttpSessionService,
  UserPreferenceService,
} from '@dnd-history/frontend-services';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sessionName = '';
  sessions: Session[] = [];

  constructor(
    private router: Router,
    private readonly sessionService: HttpSessionService,
    private readonly userPreferenceService: UserPreferenceService
  ) {}

  ngOnInit(): void {
    this.sessionName = this.userPreferenceService.get<Session>('selectedSession')?.name || '';
    this.sessionService.read().subscribe((sessions) => {
      this.sessions = sessions.sort((a, b) => a.id - b.id);
    });
  }

  submit(sessionDTO: SessionDTO): void {
    const next = (session: Session) => {
      this.userPreferenceService.set<Session>('selectedSession', session);
      this.router.navigate(['/home']);
    };
    const session = this.sessions.find((s) => s.name === sessionDTO.name);
    if (session) {
      next(session);
    } else {
      this.sessionService
        .create(sessionDTO)
        .subscribe((session: Session) => {
          next(session);
        });
    }
  }

  loginOrCreate(): 'Login' | 'Create' {
    return this.sessions.map((s) => s.name).includes(this.sessionName)
      ? 'Login'
      : 'Create';
  }
}
