import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map, PinPoint, PinPointDTO } from '@dnd-history/shared-interfaces';
import { HttpService, UrlType } from './http.service';
import { UserPreferenceService } from '../services/user-preferences-service';

@Injectable({
  providedIn: 'root',
})
export class HttpPinPointService extends HttpService<PinPoint, PinPointDTO> {
  constructor(
    http: HttpClient,
    private readonly userPreferencesService: UserPreferenceService
  ) {
    super(http);
  }

  getEndpoint(type: UrlType): string {
    const mapId = this.userPreferencesService.get<Map>('selectedMap')?.id;
    const urls = {
      read: `map/${mapId}/pinPoint`,
      create: `map/${mapId}/pinPoint`,
      update: 'map',
    };
    return urls[type];
  }
}
