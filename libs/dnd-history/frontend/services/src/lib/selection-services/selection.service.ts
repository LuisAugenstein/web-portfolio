import { Injectable } from '@angular/core';
import { ID } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class SelectionService<T extends ID> {
  protected subject$: ReplaySubject<T> = new ReplaySubject(1);
  value!: T;

  constructor(private cookieService: CookieService) {
    this.loadStateIntoSubjects();
    this.setupStoringSubscriptions();
  }

  protected abstract getCookieKey(): string;

  private loadStateIntoSubjects(): void {
    const stateString = this.cookieService.get(this.getCookieKey());
    if (stateString === '') {
      return;
    }
    this.value = JSON.parse(stateString);
    this.subject$.next(this.value);
  }

  private setupStoringSubscriptions() {
    this.subject$.subscribe((value) => {
      if (this.value && value.id === this.value.id) {
        return;
      }
      this.value = value;
      this.cookieService.set(this.getCookieKey(), JSON.stringify(value));
    });
  }
}
