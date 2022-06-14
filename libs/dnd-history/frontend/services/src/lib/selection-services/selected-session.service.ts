import { Injectable } from '@angular/core';
import { Id, Maybe } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Observable, Observer, Subscription } from 'rxjs';

type SessionId = Id;

@Injectable({ providedIn: 'root' })
export class SelectedSessionService {
  private subject$ = new BehaviorSubject<Maybe<SessionId>>(undefined);

  constructor(private cookieService: CookieService) {
    this.loadValueIntoSubject();
    this.subject$.subscribe((value) => {
      this.cookieService.set(this.getCookieKey(), JSON.stringify(value));
    });
  }

  next(value: number): void {
    if (
      this.subject$.value &&
      JSON.stringify(this.subject$.value.id) === JSON.stringify(value)
    ) {
      return;
    }
    this.subject$.next({ id: value });
  }

  reset(): void {
    this.subject$.next(undefined);
  }

  id(): Observable<Maybe<number>> {
    return this.subject$.pipe(map((value) => value?.id));
  }

  getId(): Maybe<number> {
    return this.subject$.value?.id;
  }

  protected loadValueIntoSubject(): void {
    const objectString = this.cookieService.get(this.getCookieKey());
    if (objectString === '' || objectString === 'undefined') {
      return;
    }
    const sessionId = JSON.parse(objectString) as SessionId;
    this.next(sessionId.id);
  }

  private getCookieKey(): string {
    return 'dnd-history-selectedSession';
  }
}
