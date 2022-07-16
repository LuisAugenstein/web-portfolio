import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@dnd-history/frontend-state';
import { Session } from '@dnd-history/shared-interfaces';
import { EntityCollection } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { DialogService } from 'primeng/dynamicdialog';
import {
  combineLatest,
  filter,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'dnd-history-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  session$ = combineLatest([
    this.store.select((state) => state.selectedSession),
    this.store.select(
      (state) => state.entityCache['Session'] as EntityCollection<Session>
    ),
  ]).pipe(
    filter(
      ([selectedSession, sessions]) =>
        selectedSession.loaded && sessions?.loaded
    ),
    map(([selectedSession, sessions]) => {
      const session = selectedSession.id
        ? sessions.entities[selectedSession.id]
        : undefined;
      if (session === undefined) {
        this.router.navigate(['/login']);
      }
      return session;
    })
  );

  @Input() backLink = '/login';

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private readonly dialogService: DialogService
  ) {}

  openSettingsDialog(): void {
    this.session$
      .pipe(
        switchMap((session) => {
          const reference = this.dialogService.open(SettingsDialogComponent, {
            header: 'Settings',
            data: session,
            styleClass: 'settings-dialog'
          });
          return reference.onClose;
        }),
        take(1)
      )
      .subscribe();
  }
}
