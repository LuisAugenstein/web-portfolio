import { Injectable } from '@angular/core';
import { Map } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { SelectedSessionService } from './selected-session.service';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class SelectedMapService extends SelectionService<Map> {
  constructor(
    cookieService: CookieService,
    selectedSessionService: SelectedSessionService
  ) {
    super(cookieService);
    selectedSessionService.subscribe(() => {
      this.reset();
    });
  }

  protected getCookieKey(): string {
    return 'dnd-history-selectedMap';
  }
}
