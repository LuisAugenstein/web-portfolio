import { Component, OnInit } from '@angular/core';
import {
  FileUploadService,
  MapService,
  SelectedMapService,
} from '@dnd-history/frontend-services';
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
    private readonly fileUploadService: FileUploadService,
    private readonly mapService: MapService,
    private readonly selectedMapService: SelectedMapService
  ) {}
  ngOnInit(): void {
    this.mapService.read().subscribe((maps) => {
      this.maps = maps;
      if (!this.selectedMapService.value && maps.length > 0) {
        this.selectMap(maps[0]);
      }
    });
  }

  async createMap(event: { files: File[] }) {
    const url = await this.fileUploadService.upload(event.files[0]);
    this.mapService
      .create({
        src: url,
      })
      .subscribe((newMap) => {
        this.maps.push(newMap);
      });
    this.chosenFilesToUpload = [];
  }

  selectMap(map: Map) {
    this.selectedMapService.selectedMap$.next(map);
  }
}
