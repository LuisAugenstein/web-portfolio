import { Component, OnInit } from '@angular/core';
import {
  AppState,
  selectMapMarker,
} from '@dnd-history/frontend-state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dnd-history-map-marker-sidebar',
  templateUrl: './map-marker-sidebar.component.html',
  styleUrls: ['./map-marker-sidebar.component.scss'],
})
export class MapMarkerSidebarComponent implements OnInit {
  mapMarker$ = this.store.select(selectMapMarker);

  constructor(
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {}
}
