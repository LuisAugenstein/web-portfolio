import { Injectable } from '@angular/core';
import { Selectable } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export abstract class SelectionService {
  constructor(private cookieService: CookieService) {}

  get(): Selectable {
    const objectString = this.cookieService.get(this.getCookieKey());
    if (objectString === '') {
      return {
        id: undefined,
      };
    }
    return JSON.parse(objectString) as Selectable;
  }

  set(value: Selectable) {
    this.cookieService.set(this.getCookieKey(), JSON.stringify(value));
  }

  protected abstract getCookieKey(): string;
}
