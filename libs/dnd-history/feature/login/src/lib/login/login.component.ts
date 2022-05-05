import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@web-portfolio/dnd-history/data-access/api-interfaces';

import { SessionService } from '../services/session.service';

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
    this.sessionNames = this.sessionService.getSessions().map(s => s.name);
  }

  submit({ sessionName }: { sessionName: string }): void {
    const session: Session = { name: sessionName };
    if (!this.sessionService.doesSessionExis(session)) {
      this.sessionService.createNewSession(session);
    }
    this.sessionService.setCurrentSession(session);
    this.router.navigate(['/home']);
  }
}
