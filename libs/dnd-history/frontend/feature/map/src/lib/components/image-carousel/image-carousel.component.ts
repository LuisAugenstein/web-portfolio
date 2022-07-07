import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AppState,
  FileUploadService,
  MapService,
  selectSession,
  SELECT_MAP,
} from '@dnd-history/frontend-state';
import { NanoId, Session } from '@dnd-history/shared-interfaces';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'dnd-history-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  maps$ = this.mapService.entities$;
  chosenFilesToUpload: File[] = [];
  private subscription?: Subscription;

  constructor(
    private readonly fileUploadService: FileUploadService,
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

  async createMap(event: { files: File[] }): Promise<void> {
    this.chosenFilesToUpload = [];
    const url = await this.fileUploadService.upload(event.files[0]);
    this.mapService.add({
      id: nanoid(),
      src: url,
      mapMarkers: [],
      mapMarkerConnections: [],
    });
  }

  selectMap(id: NanoId) {
    this.store.dispatch({ type: SELECT_MAP.type, id });
  }
}
