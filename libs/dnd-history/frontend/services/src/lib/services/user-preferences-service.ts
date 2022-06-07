import { Injectable } from '@angular/core';
import { Map, Session } from '@dnd-history/shared-interfaces';
import { CookieService } from 'ngx-cookie-service';
import { Observer, ReplaySubject, Subscription } from 'rxjs';

type UserPreferenceValue = Session | Map;

interface UserPreference<T extends UserPreferenceValue> {
  value?: T;
  subject: ReplaySubject<T>;
}

interface UserPreferences {
  selectedMap: UserPreference<Map>;
  selectedSession: UserPreference<Session>;
}

@Injectable({
  providedIn: 'root',
})
export class UserPreferenceService {
  private userPreferences: UserPreferences = {
    selectedMap: {
      subject: new ReplaySubject(1),
    },
    selectedSession: {
      subject: new ReplaySubject(1),
    },
  };

  constructor(private cookieService: CookieService) {
    this.loadUserPreferences();
  }

  get<T extends UserPreferenceValue>(
    key: keyof UserPreferences
  ): T | undefined {
    return this.userPreferences[key].value as T | undefined;
  }

  set<T extends UserPreferenceValue>(
    key: keyof UserPreferences,
    value: T
  ): void {
    this.userPreferences[key].value = value;
    (this.userPreferences[key].subject as unknown as ReplaySubject<T>).next(
      value
    );

    const userPreferenceValues = Object.values(this.userPreferences).map(
      (userPreference) => userPreference.value
    );
    const userPreferencesDTO = Object.keys(this.userPreferences).reduce(
      (obj, key, index) => ({ ...obj, [key]: userPreferenceValues[index] }),
      {}
    );
    this.cookieService.set(
      'dnd-history-userPreferences',
      JSON.stringify(userPreferencesDTO)
    );
  }

  subscribe<T extends UserPreferenceValue>(
    key: keyof UserPreferences,
    observer: (value: T) => void | Partial<Observer<T>>
  ): Subscription {
    return (
      this.userPreferences[key].subject as unknown as ReplaySubject<T>
    ).subscribe(observer);
  }

  private loadUserPreferences(): void {
    const userPreferencesString = this.cookieService.get(
      'dnd-history-userPreferences'
    );

    if (userPreferencesString === '') {
      return;
    }

    let userPreferences;
    try {
      userPreferences = JSON.parse(userPreferencesString);;
    } catch (e) {
      console.error(e);
      return;
    }

    Object.entries(userPreferences).forEach(([key, value]) => {
      this.set(key as keyof UserPreferences, value as UserPreferenceValue);
    });
  }
}
