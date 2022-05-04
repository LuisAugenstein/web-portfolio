import { Component, Input, OnInit } from '@angular/core';
import { CurrentSessionService } from '@web-portfolio/dnd-history-feature-login';

@Component({
  selector: 'dnd-history-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  session = '';

  @Input() backLink = '/login';

  constructor(private currentSessionService: CurrentSessionService) {}

  ngOnInit(): void {
    this.session = this.currentSessionService.session;
  }
}
