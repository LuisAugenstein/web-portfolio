import { Component, Input } from '@angular/core';
import { SelectedSessionService } from '@dnd-history/frontend-services';

@Component({
  selector: 'dnd-history-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sessionName = '';

  @Input() backLink = '/login';

  constructor(selectedSessionService: SelectedSessionService) {
    selectedSessionService.selectedSession$.subscribe((selectedSession) => {
      this.sessionName = selectedSession.name;
    });
  }
}
