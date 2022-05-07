import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from '@dnd-history/frontend-services';

@Component({
  selector: 'dnd-history-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sessionName = '';

  @Input() backLink = '/login';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionName = this.sessionService.getCurrentSession().name;
  }
}
