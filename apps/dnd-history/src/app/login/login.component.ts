import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sessionName?: string;

  constructor(private router: Router, public sessionService: SessionService) {}

  ngOnInit(): void {
    console.log('access database and get possible adventures');
  }

  /**
   * navigates the user to the selected session.
   * If necessary, a new session is created.
   */
  submit({ session }: { session: string }): void {
    if (!this.sessionService.sessionExists(session)) {
      this.sessionService.createNewSession(session);
    }
    this.router.navigate(['/home', session]);
  }
}
