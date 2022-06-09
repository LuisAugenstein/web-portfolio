import { Injectable } from '@angular/core';
import { HttpService } from '../http-services/http.service';
import { ID } from '@dnd-history/shared-interfaces';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const TEMPORARY_ID = -1;

@Injectable({ providedIn: 'root' })
export abstract class StateService<T extends ID, TDTO> {
  private readonly stateObjects$ = new BehaviorSubject<T[]>([]);

  constructor(private readonly httpService: HttpService<T, TDTO>) {
    this.httpService.read().subscribe((stateObjects) => {
      this.stateObjects$.next(stateObjects.sort((a, b) => a.id - b.id));
    });
  }

  read(): BehaviorSubject<T[]> {
    return this.stateObjects$;
  }

  create(dto?: TDTO): Observable<T> {
    const tempT = { ...dto, id: TEMPORARY_ID } as T;
    this.stateObjects$.value.push(tempT);
    this.stateObjects$.next(this.stateObjects$.value);
    return this.httpService.create(dto).pipe(
      tap((stateObject) => {
        const updatedStateObjects = this.stateObjects$.value.filter((stateObject) => stateObject.id !== TEMPORARY_ID);
        updatedStateObjects.push(stateObject);
        this.stateObjects$.next(updatedStateObjects);
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
    return this.httpService.update(updatedStateObject);
  }
}
