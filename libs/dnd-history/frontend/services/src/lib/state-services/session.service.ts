import { Injectable } from '@angular/core';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import { HttpSessionService } from '../http-services/http-session.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class SessionService extends StateService<Session, SessionDTO> {
  constructor(httpSessionService: HttpSessionService) {
    super(httpSessionService);
  }
}