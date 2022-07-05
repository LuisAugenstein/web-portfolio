import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FileUploadService,
  MapService,
  SelectedMapService,
  SelectedSessionService,
} from '@dnd-history/frontend-state';
import { Map } from '@dnd-history/shared-interfaces';

@Component({
  selector: 'dnd-history-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {
  maps: Map[] = [];
  chosenFilesToUpload: File[] = [];

  constructor(
    private readonly selectedSessionService: SelectedSessionService,
    private readonly fileUploadService: FileUploadService,
    private readonly mapService: MapService,
    private readonly selectedMapService: SelectedMapService
  ) {}

  ngOnInit(): void {
    const sessionId = this.selectedSessionService.value()?.id as number;
    this.mapService.getAll(sessionId).subscribe((maps) => {
      this.maps = maps;
      if (!this.selectedMapService.value() && maps.length > 0) {
        this.selectMap(maps[0].id);
      }
    });
  }

  async createMap(event: { files: File[] }) {
    const url = await this.fileUploadService.upload(event.files[0]);
    this.mapService
      .create(this.selectedSessionService.value()?.id as number, {
        src: url,
        mapMarkers: [],
        mapMarkerConnections: [],
      })
      .subscribe((newMap) => {
        this.maps.push(newMap);
      });
    this.chosenFilesToUpload = [];
  }

  selectMap(id: number | undefined) {
    id ? this.selectedMapService.next({ id }) : this.selectedMapService.reset();
  }
}
