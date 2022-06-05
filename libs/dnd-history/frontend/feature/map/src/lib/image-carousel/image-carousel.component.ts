import { Component, OnInit } from '@angular/core';
import { FileUploadService, UserPreferenceService } from '@dnd-history/frontend-services';
import { Map } from '@dnd-history/shared-interfaces';
import { take } from 'rxjs';
import { HTTPMapService } from '@dnd-history/frontend-services';

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
    private readonly userPreferenceService: UserPreferenceService
  ) {}

  ngOnInit(): void {
    this.httpMapService.read().subscribe((maps) => {
      this.maps = maps.sort((a, b) => a.id - b.id);
      if(!this.userPreferenceService.get<Map>('selectedMap') && this.maps.length > 0){
        this.selectMap(this.maps[0]);
      }
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
      });
    this.chosenFilesToUpload = [];
  }

  selectMap(map: Map) {
    this.userPreferenceService.set<Map>('selectedMap', map);
  }
}
