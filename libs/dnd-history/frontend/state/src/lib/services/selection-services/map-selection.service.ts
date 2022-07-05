import { Injectable } from '@angular/core';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class SelectedMapService extends SelectionService {
  protected getCookieKey(): string {
    return 'dnd-history-selectedMap';
  }
}
