import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import { SessionService } from '@dnd-history/frontend-services';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sessionName = '';
  sessions: Session[] = [];

  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionName = this.sessionService.getCurrentSession().name;
    this.sessionService.readSessions().subscribe((sessions) => {
      this.sessions = sessions.sort((a,b) => a.id - b.id);
    });
  }

  submit(sessionDTO: SessionDTO): void {
    const next = (session: Session) => {
      this.sessionService.setCurrentSession(session);
      this.router.navigate(['/home']);
    };
    const session = this.sessions.find((s) => s.name === sessionDTO.name);
    if (session) {
      next(session);
    } else {
      this.sessionService
        .createSession(sessionDTO)
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
