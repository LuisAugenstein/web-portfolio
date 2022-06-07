import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import { HttpService, UrlType } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class HttpSessionService extends HttpService<Session, SessionDTO> {
  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(type: UrlType): string {
    const urls = {
      read: 'session',
      create: 'session',
      update: '',
    };
    return urls[type];
  }
}
