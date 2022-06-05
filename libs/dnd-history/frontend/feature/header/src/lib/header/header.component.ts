import { Component, Input, OnInit } from '@angular/core';
import { UserPreferenceService } from '@dnd-history/frontend-services';
import { Session } from '@dnd-history/shared-interfaces';

@Component({
  selector: 'dnd-history-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sessionName = '';

  @Input() backLink = '/login';

  constructor(private userPreferenceService: UserPreferenceService) {}

  ngOnInit(): void {
    this.sessionName = this.userPreferenceService.get<Session>('selectedSession')?.name || '';
  }
}
