import { HttpClient } from '@angular/common/http';
import { Map, MapDTO, Session } from '@dnd-history/shared-interfaces';
import { Injectable } from '@angular/core';
import { UserPreferenceService } from '../services/user-preferences-service';
import { HttpService, UrlType } from './http.service';

@Injectable({ providedIn: 'root' })
export class HTTPMapService extends HttpService<Map, MapDTO> {
  constructor(
    http: HttpClient,
    private readonly userPreferencesService: UserPreferenceService
  ) {
    super(http);
  }

  getEndpoint(type: UrlType): string {
    const sessionId =  this.userPreferencesService.get<Session>('selectedSession')?.id;
    const urls = {
      read: `session/${sessionId}/map`,
      create: `map/${sessionId}/map`,
      update: '',
    };
    return urls[type];
  }
}
