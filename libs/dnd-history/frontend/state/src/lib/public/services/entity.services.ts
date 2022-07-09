import { Injectable } from '@angular/core';
import {
  Adventure,
  Map,
  MapMarker,
  Session,
} from '@dnd-history/shared-interfaces';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Store } from '@ngrx/store';
import { filter, map, Observable, ReplaySubject, switchMap, take } from 'rxjs';
import { AppState } from '../../app.state';
import { selectMap } from '../selectors/entity.selectors';

@Injectable({ providedIn: 'root' })
export class SessionService extends EntityCollectionServiceBase<Session> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Session', serviceElementsFactory);
  }
}

@Injectable({ providedIn: 'root' })
export class AdventureService extends EntityCollectionServiceBase<Adventure> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Adventure', serviceElementsFactory);
  }
}

@Injectable({ providedIn: 'root' })
export class MapService extends EntityCollectionServiceBase<Map> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private myStore: Store<AppState>
  ) {
    super('Map', serviceElementsFactory);
  }

  updateMapMarker(newMapMarker: Partial<MapMarker>): Observable<MapMarker> {
    const getMapMarker$ = new ReplaySubject<MapMarker>(1);
    this.myStore
      .select(selectMap)
      .pipe(
        take(1),
        filter((selectedMap) => selectedMap !== undefined),
        switchMap((selectedMap) =>
          this.update({
            ...selectedMap,
            mapMarkers: (selectedMap as Map).mapMarkers.map((m) =>
              m.id === newMapMarker.id ? { ...m, ...newMapMarker } : m
            ),
          })
        ),
        map(
          ({ mapMarkers }) =>
            mapMarkers.find((m) => m.id === newMapMarker.id) as MapMarker
        )
      )
      .subscribe((mapMarker) => getMapMarker$.next(mapMarker));
    return getMapMarker$.asObservable();
  }
}
