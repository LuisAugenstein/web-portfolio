import { Injectable } from '@angular/core';
import { Id, Maybe } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Observable, Observer, Subscription } from 'rxjs';

interface MapId extends Id {
  mapMarkerId?: number;
}

@Injectable({ providedIn: 'root' })
export class SelectedMapService {
  private subject$ = new BehaviorSubject<Maybe<MapId>>(undefined);

  constructor(private cookieService: CookieService) {
    this.loadValueIntoSubject();
    this.subject$.subscribe((value) => {
      this.cookieService.set(this.getCookieKey(), JSON.stringify(value));
    });
  }

  next(value: MapId): void {
    if (
      this.subject$.value &&
      JSON.stringify(this.subject$.value) === JSON.stringify(value)
    ) {
      return;
    }
    this.subject$.next(value);
  }

  reset(): void {
    if (this.subject$.value !== undefined) {
      this.subject$.next(undefined);
    }
  }

  id(): Observable<Maybe<number>> {
    return this.subject$.pipe(map((value) => value?.id));
  }

  markerId(): Observable<Maybe<number>> {
    return this.subject$.pipe(map((value) => value?.mapMarkerId));
  }

  getId(): Maybe<number> {
    return this.subject$.value?.id;
  }

  getMarkerId(): Maybe<number> {
    return this.subject$.value?.mapMarkerId;
  }

  protected loadValueIntoSubject(): void {
    const objectString = this.cookieService.get(this.getCookieKey());
    if (objectString === '' || objectString === 'undefined') {
      return;
    }
    const mapId = JSON.parse(objectString) as MapId;
    this.next(mapId);
  }

  private getCookieKey(): string {
    return 'dnd-history-selectedMap';
  }
}
