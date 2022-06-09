import { Injectable } from '@angular/core';
import { Session } from '@dnd-history/shared-interfaces';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class SelectedSessionService extends SelectionService<Session> {
  selectedSession$ = this.subject$;
  protected getCookieKey(): string {
    return 'dnd-history-selectedSession';
  }
}
