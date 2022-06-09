import { Injectable } from '@angular/core';
import { ID } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observer, Subscription } from 'rxjs';

export type Maybe<T> = T | undefined;

@Injectable({ providedIn: 'root' })
export abstract class SelectionService<T extends ID> {
  private subject$: BehaviorSubject<Maybe<T>> = new BehaviorSubject(
    undefined as any
  );

  constructor(private cookieService: CookieService) {
    this.loadStateIntoSubjects();
    this.subject$.subscribe((value) => {
      this.cookieService.set(this.getCookieKey(), JSON.stringify(value));
    });
  }

  protected abstract getCookieKey(): string;

  next(value: T): void {
    if (this.subject$.value && this.subject$.value.id === value.id) {
      return;
    }
    this.subject$.next(value);
  }

  reset(): void {
    this.subject$.next(undefined);
  }

  subscribe(
    observer: (value: Maybe<T>) => void | Partial<Observer<Maybe<T>>>
  ): Subscription {
    return this.subject$.subscribe(observer);
  }

  getValue(): Maybe<T> {
    return this.subject$.value;
  }

  protected loadStateIntoSubjects(): void {
    const stateString = this.cookieService.get(this.getCookieKey());
    if (stateString === '' || stateString === 'undefined') {
      return;
    }
    const value = JSON.parse(stateString) as T;
    this.next(value);
  }
}
