import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  SelectedSessionService as SelectedSessionService,
  SessionService,
} from '@dnd-history/frontend-services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'dnd-history-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sessionName = '';

  @Input() backLink = '/login';

  constructor(
    private router: Router,
    selectedSessionIdService: SelectedSessionService,
    sessionService: SessionService
  ) {
    selectedSessionIdService
      .id()
      .pipe(
        switchMap((selectedSessionId) => sessionService.get(selectedSessionId))
      )
      .subscribe((selectedSession) => {
        if (!selectedSession) {
          this.router.navigate(['/login']);
          return;
        }
        this.sessionName = selectedSession.name;
      });
  }
}
