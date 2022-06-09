import { Injectable } from '@angular/core';
import { ID } from '@dnd-history/shared-interfaces';
import { BehaviorSubject, Observable, Observer, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export abstract class StateService<T extends ID, TDTO> {
  protected abstract readUrl: string;
  protected abstract createUrl: string;
  protected abstract updateUrl: string;
  protected readonly stateObjects$ = new BehaviorSubject<T[]>([]);

  constructor(private readonly http: HttpClient) {}

  refresh(): void {
    this.http.get<T[]>(`${environment.backendUrl}/${this.readUrl}`).subscribe((stateObjects) => {
      const nextStateObjects = stateObjects.sort((a, b) => a.id - b.id);
      this.stateObjects$.next(nextStateObjects);
    });
  }

  subscribe(
    observer: (value: T[]) => void | Partial<Observer<T[]>>
  ): Subscription {
    return this.stateObjects$.subscribe(observer);
  }

  getValue(): T[] {
    return this.stateObjects$.value;
  }

  create(dto?: TDTO): Observable<T> {
    return (this.http.post(`${environment.backendUrl}/${this.createUrl}`, dto) as Observable<T>).pipe(
      tap((stateObject) => {
        this.stateObjects$.value.push(stateObject);
        this.stateObjects$.next(this.stateObjects$.value);
      })
    );
  }

  update(updatedStateObject: T) {
    const updatedStateObjects = this.stateObjects$.value.map((stateObject) => {
      return stateObject.id === updatedStateObject.id
        ? updatedStateObject
        : stateObject;
    });
    this.stateObjects$.next(updatedStateObjects);
    return this.http.put(`${environment.backendUrl}/${this.updateUrl}/${updatedStateObject.id}`, updatedStateObject);
  }
}
