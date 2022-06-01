import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '@dnd-history/frontend-services';
import { Map } from '@dnd-history/shared-interfaces';
import { MapService } from '../services/map.service';

@Component({
  selector: 'dnd-history-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {
  filesToUpload: File[] = [];
  maps: Map[] = [];

  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly mapService: MapService
  ) {}

  ngOnInit(): void {
    this.mapService.read().subscribe((maps) => {
      this.maps = maps.sort((a, b) => a.id - b.id);
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
        //maybe directly select the new map?
      });
    this.filesToUpload = [];
  }
}
