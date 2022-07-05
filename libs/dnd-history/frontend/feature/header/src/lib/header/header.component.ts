import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@dnd-history/frontend-state';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'dnd-history-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sessionName$ = combineLatest([
    this.store.select((state) => state.selectedSession),
    this.store.select((state) => state.sessions),
  ]).pipe(
    filter(([selectedSession, sessions]) => selectedSession.id !== 'loading' && sessions.length > 0),
    map(([selectedSession, sessions]) => {
      const session = sessions.find((s) => s.id === selectedSession.id);
      if (session === undefined) {
        this.router.navigate(['/login']);
      }
      return session?.name;
    })
  );

  @Input() backLink = '/login';

  constructor(private router: Router, private store: Store<AppState>) {}
}
