import { Component, OnInit } from '@angular/core';
import {
  MapService,
  SelectedMapMarkerService,
  SelectedMapService,
  SelectedSessionService,
} from '@dnd-history/frontend-state';
import { MapMarker } from '@dnd-history/shared-interfaces';
import { combineLatest, map, switchMap } from 'rxjs';

@Component({
  selector: 'dnd-history-map-marker-sidebar',
  templateUrl: './map-marker-sidebar.component.html',
  styleUrls: ['./map-marker-sidebar.component.scss'],
})
export class MapMarkerSidebarComponent implements OnInit {
  mapMarker?: MapMarker;

  constructor(
    private readonly selectedSessionService: SelectedSessionService,
    private readonly selectedMapMarkerService: SelectedMapMarkerService,
    private readonly mapService: MapService,
    private readonly selectedMapService: SelectedMapService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.selectedSessionService.get(),
      this.selectedMapService.get(),
      this.selectedMapMarkerService.get(),
    ])
      .pipe(
        switchMap(([selectedSession, selectedMap, selectedMapMarker]) =>
          this.mapService.getMapMarker(
            selectedSession?.id as number,
            selectedMap?.id as number,
            selectedMapMarker?.id as number
          )
        )
      )
      .subscribe((mapMarker) => {
        this.mapMarker = mapMarker;
      });
    // this.selectedMapMarkerService.get().subscribe((selectedMapMarker) => {
    //   console.log('selectedMap: ', selectedMapMarker);
    //   this.mapMarkerId = selectedMapMarker?.id;
    // });
  }
}
