import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@web-portfolio/dnd-history/data-access/api-interfaces';
import { SessionService } from '@web-portfolio/dnd-history/client-services';
import { pluck } from 'rxjs';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sessionName = '';
  sessionNames: string[] = [];

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.sessionName = this.sessionService.getCurrentSession().name;
    this.sessionService.sessions$.subscribe((sessions) => this.sessionNames = sessions.map(s => s.name))
  }

  submit({ sessionName }: { sessionName: string }): void {
    const session: Session = { name: sessionName };
    if (!this.sessionNames.includes(sessionName)) {
      this.sessionService.createNewSession(session);
    }
    this.sessionService.setCurrentSession(session);
    this.router.navigate(['/home']);
  }
}
