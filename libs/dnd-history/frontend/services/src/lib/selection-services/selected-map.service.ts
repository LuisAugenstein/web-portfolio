import { Injectable } from '@angular/core';
import { Map } from '@dnd-history/shared-interfaces';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class SelectedMapService extends SelectionService<Map> {
  selectedMap$ = this.subject$;
  protected getCookieKey(): string {
    return 'dnd-history-selectedMap';
  }
}
