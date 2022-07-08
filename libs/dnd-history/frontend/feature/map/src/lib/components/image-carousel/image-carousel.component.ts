import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AppState,
  FileUploadService,
  MapService,
  selectSession,
  SELECT_MAP,
} from '@dnd-history/frontend-state';
import { Map, NanoId, Session } from '@dnd-history/shared-interfaces';
import { EntityCollection } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
import {
  combineLatest,
  filter,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'dnd-history-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  maps$ = this.mapService.entities$;
  chosenFilesToUpload: File[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly mapService: MapService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const loadMaps = this.store
      .select(selectSession)
      .pipe(filter((selectedSession) => selectedSession !== undefined))
      .subscribe((selectedSession) => {
        this.mapService.clearCache();
        this.mapService.getWithQuery({
          sessionId: (selectedSession as Session).id,
        });
      });

    const defaultSelectMap = combineLatest([
      this.maps$,
      this.store.select((state) => state.selectedMap),
    ]).subscribe(([maps, selectedMap]) => {
      if (maps?.length !== 0 && maps.every((m) => m.id !== selectedMap?.id)) {
        this.selectMap(maps[0].id);
      }
    });

    this.subscriptions = [loadMaps, defaultSelectMap];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  async createMap(event: { files: File[] }): Promise<void> {
    this.chosenFilesToUpload = [];
    const url = await this.fileUploadService.upload(event.files[0]);
    this.maps$.pipe(take(1)).subscribe((maps) => {
      this.mapService.add({
        id: nanoid(),
        src: url,
        sortIndex: maps.length,
        mapMarkers: [],
        mapMarkerConnections: [],
      });
    });
  }

  selectMap(id: NanoId) {
    this.store.dispatch({ type: SELECT_MAP.type, id });
  }
}
