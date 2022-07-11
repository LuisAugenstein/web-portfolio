import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AppState,
  MapService,
  selectMapMarker,
} from '@dnd-history/frontend-state';
import { MapMarker } from '@dnd-history/shared-interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dnd-history-map-marker-sidebar',
  templateUrl: './map-marker-sidebar.component.html',
  styleUrls: ['./map-marker-sidebar.component.scss'],
})
export class MapMarkerSidebarComponent implements OnInit, OnDestroy {
  mapMarker?: MapMarker;
  subscription?: Subscription;

  constructor(
    private readonly store: Store<AppState>,
    private readonly mapService: MapService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectMapMarker)
      .subscribe((selectedMapMarker) => (this.mapMarker = selectedMapMarker));
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getTitleLabel(title: string | undefined) {
    return title === undefined || title === '' ? 'Click to Edit' : title;
  }

  updateTitle(event: any): void {
    const updatedTitle = event.target.parentElement.previousElementSibling.value;
    if(!this.mapMarker || this.mapMarker.title === updatedTitle){
      return;
    }
    this.mapMarker = {...this.mapMarker, title: updatedTitle};
    this.mapService.updateMapMarker(this.mapMarker);
  }

  updateDescription(event: any): void {
    const updatedDescription = event.target.parentElement.previousElementSibling.value;
    if(!this.mapMarker || this.mapMarker.description === updatedDescription){
      return;
    }
    this.mapMarker = {...this.mapMarker, description: updatedDescription};
    this.mapService.updateMapMarker(this.mapMarker);
  }
}
