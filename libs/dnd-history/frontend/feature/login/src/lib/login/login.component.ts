import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import {
  SelectedMapService,
  SelectedSessionService,
  SessionService,
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
    private readonly sessionService: SessionService,
    private readonly selectedSessionService: SelectedSessionService,
    private readonly selectedMapService: SelectedMapService
  ) {}

  ngOnInit(): void {
    this.sessionService.getAll().subscribe((sessions) => {
      const selectedSessionId = this.selectedSessionService.getId();
      this.sessionService
        .get(selectedSessionId)
        .subscribe((selectedSession) => {
          this.sessionName = selectedSession?.name || '';
          this.sessions.push(...sessions);
        });
    });
  }

  submit(sessionDTO: SessionDTO): void {
    const next = (session: Session) => {
      if (this.selectedSessionService.getId() !== session.id) {
        this.selectedMapService.reset();
      }
      this.selectedSessionService.next(session.id);
      this.router.navigate(['/home']);
    };
    //TODO: don't filter sessions by name. check if p-dropdown can have id as value
    const session = this.sessions.find((s) => s.name === sessionDTO.name);
    if (session) {
      next(session);
    } else {
      this.sessionService.create(sessionDTO).subscribe((session: Session) => {
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
