import { HttpClient } from '@angular/common/http';
import { Adventure, AdventureDTO, Session } from '@dnd-history/shared-interfaces';
import { UserPreferenceService } from '@dnd-history/frontend-services';
import { Injectable } from '@angular/core';
import { HttpService, UrlType } from './http.service';

@Injectable({ providedIn: 'root' })
export class HttpAdventureService extends HttpService<Adventure, AdventureDTO> {
 
  constructor(
    http: HttpClient,
    private readonly userPreferenceService: UserPreferenceService
  ) {
    super(http);
  }

  getEndpoint(type: UrlType): string {
    const sessionId = this.userPreferenceService.get<Session>('selectedSession')?.id;
    const urls = {
      read: `session/${sessionId}/adventure`,
      create: `session/${sessionId}/adventure`,
      update: 'adventure',
    };
    return urls[type];
  }
}
