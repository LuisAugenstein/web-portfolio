import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class SessionService extends StateService<Session, SessionDTO> {
  protected readUrl = 'session';
  protected createUrl = 'session';
  protected updateUrl = '';

  constructor(http: HttpClient) {
    super(http);
    this.refresh();
  }
}
