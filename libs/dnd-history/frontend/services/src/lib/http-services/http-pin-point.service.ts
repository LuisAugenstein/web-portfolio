import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PinPoint, PinPointDTO } from '@dnd-history/shared-interfaces';
import { HttpService, UrlType } from './http.service';
import { SelectedMapService } from '../selection-services/selected-map.service';

@Injectable({
  providedIn: 'root',
})
export class HttpPinPointService extends HttpService<PinPoint, PinPointDTO> {

  private currentMapId!: number;

  constructor(
    http: HttpClient,
    selectedMapService: SelectedMapService
  ) {
    super(http);
    selectedMapService.selectedMap$.subscribe(selectedMap => {
      this.currentMapId = selectedMap.id;
    });
  }

  getEndpoint(type: UrlType): string {
    const urls = {
      read: `map/${this.currentMapId}/pinPoint`,
      create: `map/${this.currentMapId}/pinPoint`,
      update: 'map',
    };
    return urls[type];
  }
}
