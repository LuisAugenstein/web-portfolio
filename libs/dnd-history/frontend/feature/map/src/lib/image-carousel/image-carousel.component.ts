import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '@dnd-history/frontend-services';
import { Map } from '@dnd-history/shared-interfaces';
import { HTTPMapService } from '../services/http-map.service';
import { SelectionService } from '../services/selection.service';

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
    private readonly httpMapService: HTTPMapService,
    private readonly selectionService: SelectionService
  ) {}

  ngOnInit(): void {
    this.httpMapService.read().subscribe((maps) => {
      this.maps = maps.sort((a, b) => a.id - b.id);
    });
  }

  async createMap(event: { files: File[] }) {
    const url = await this.fileUploadService.upload(event.files[0]);
    this.httpMapService
      .create({
        src: url,
      })
      .subscribe((newMap) => {
        this.maps.push(newMap);
        //maybe directly select the new map?
      });
    this.chosenFilesToUpload = [];
  }

  selectMap(map: Map) {
    this.selectionService.setMap(map);
  }
}
