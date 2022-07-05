import { Injectable } from '@angular/core';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class SessionSelectionService extends SelectionService {
  protected getCookieKey(): string {
    return 'dnd-history-selectedSession';
  }
}
