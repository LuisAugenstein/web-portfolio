import { HttpClient } from '@angular/common/http';
import { Map, MapDTO, Session } from '@dnd-history/shared-interfaces';
import { Injectable } from '@angular/core';
import { HttpService, UrlType } from './http.service';
import { SelectedSessionService } from '../selection-services/selected-session.service';

@Injectable({ providedIn: 'root' })
export class HTTPMapService extends HttpService<Map, MapDTO> {

  private currentSessionId!: number;

  constructor(
    http: HttpClient,
    selectedSessionService: SelectedSessionService
  ) {
    super(http);
    selectedSessionService.selectedSession$.subscribe(selectedSession => {
      this.currentSessionId = selectedSession.id;
    })
  }

  getEndpoint(type: UrlType): string {
    const urls = {
      read: `session/${this.currentSessionId}/map`,
      create: `map/${this.currentSessionId}/map`,
      update: '',
    };
    return urls[type];
  }
}
