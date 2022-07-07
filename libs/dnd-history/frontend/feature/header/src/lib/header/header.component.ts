import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@dnd-history/frontend-state';
import { Session } from '@dnd-history/shared-interfaces';
import { EntityCollection } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, tap } from 'rxjs';

@Component({
  selector: 'dnd-history-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sessionName$ = combineLatest([
    this.store.select((state) => state.selectedSession),
    this.store.select((state) => state.entityCache['Session'] as EntityCollection<Session>),
  ]).pipe(
    filter(([selectedSession, sessions]) => selectedSession.loaded && sessions?.loaded),
    map(([selectedSession, sessions]) => {
      const session = selectedSession.id ? sessions.entities[selectedSession.id] : undefined;
      if (session === undefined) {
        this.router.navigate(['/login']);
      }
      return session?.name;
    })
  );

  @Input() backLink = '/login';

  constructor(private router: Router, private store: Store<AppState>) {}
}
