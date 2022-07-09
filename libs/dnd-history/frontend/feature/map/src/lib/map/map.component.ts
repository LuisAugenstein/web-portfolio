import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {
  AppState,
  MapService,
  selectSession,
} from '@dnd-history/frontend-state';
import { Session } from '@dnd-history/shared-interfaces';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'dnd-history-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  loaded$ = this.mapService.loaded$;
  private subscription?: Subscription;

  constructor(
    private readonly mapService: MapService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectSession)
      .pipe(filter((selectedSession) => selectedSession !== undefined))
      .subscribe((selectedSession) => {
        this.mapService.clearCache();
        this.mapService.getWithQuery({
          sessionId: (selectedSession as Session).id,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
