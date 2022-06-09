import { HttpClient } from '@angular/common/http';
import {
  Adventure,
  AdventureDTO,
  Session,
} from '@dnd-history/shared-interfaces';
import { Injectable } from '@angular/core';
import { HttpService, UrlType } from './http.service';
import { SelectedSessionService } from '../selection-services/selected-session.service';

@Injectable({ providedIn: 'root' })
export class HttpAdventureService extends HttpService<Adventure, AdventureDTO> {
  private sessionId!: number;

  constructor(
    http: HttpClient,
    selectedSessionService: SelectedSessionService
  ) {
    super(http);
    selectedSessionService.selectedSession$.subscribe((selectedSession) => {
      this.sessionId = selectedSession.id;
    });
  }

  getEndpoint(type: UrlType): string {
    const urls = {
      read: `session/${this.sessionId}/adventure`,
      create: `session/${this.sessionId}/adventure`,
      update: 'adventure',
    };
    return urls[type];
  }
}
