import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentSessionService } from '../services/current-session.service';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sessionName?: string;

  constructor(private router: Router, public sessionService: SessionService, private currentSessionService: CurrentSessionService) {}

  ngOnInit(): void {
    console.log('access database and get possible adventures');
    this.sessionName = this.currentSessionService.session;
  }

  submit({ session }: { session: string }): void {
    if (!this.sessionService.sessionExists(session)) {
      this.sessionService.createNewSession(session);
    }
    this.currentSessionService.session = session;
    this.router.navigate(['/home']);
  }
}
