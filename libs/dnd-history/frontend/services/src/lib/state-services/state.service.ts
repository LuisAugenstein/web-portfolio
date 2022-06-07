import { Injectable } from '@angular/core';
import { HttpService } from '@dnd-history/frontend-services';
import { ID } from '@dnd-history/shared-interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class StateService<T extends ID, TDTO> {
  private stateObjects: T[] = [];

  constructor(private readonly httpService: HttpService<T, TDTO>) {
    this.httpService.read().subscribe((stateObjects) => {
      this.stateObjects = stateObjects.sort((a, b) => a.id - b.id);
    });
  }

  read(): T[] {
    return this.stateObjects;
  }

  create(dto?: TDTO): Observable<T> {
    return this.httpService
      .create(dto)
      .pipe(tap((stateObject) => this.stateObjects.push(stateObject)));
  }

  update(updatedStateObject: T) {
    this.stateObjects = this.stateObjects.map((stateObject) => {
      return stateObject.id === updatedStateObject.id
        ? updatedStateObject
        : stateObject;
    });
    return this.httpService.update(updatedStateObject);
  }
}
