import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import {
  ID,
  Map,
  MapDTO,
  MapMarker,
  MapMarkerDTO,
} from '@dnd-history/shared-interfaces';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  lastValueFrom,
  map,
  Observable,
  Observer,
  of,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class MapService {
  private maps = new BehaviorSubject<Map[]>([]);
  private sessionId?: number;

  constructor(private readonly http: HttpClient) {}

  create(sessionId: number, dto?: MapDTO): Observable<Map> {
    return (
      this.http.post(
        `${environment.backendUrl}/session/${sessionId}/map`,
        dto
      ) as Observable<Map>
    ).pipe(
      tap((map) => {
        this.maps.next(this.insertEntity(this.maps.value, map));
      })
    );
  }

  async createMapMarker(
    sessionId: number,
    mapId: number,
    dto?: MapMarkerDTO
  ): Promise<MapMarker> {
    const url = `${environment.backendUrl}/map/${mapId}/mapMarker`;
    const mapMarker = await lastValueFrom(
      this.http.post(url, dto) as Observable<MapMarker>
    );
    forkJoin([
      this.getAll(sessionId).pipe(take(1)),
      this.get(sessionId, mapId).pipe(take(1)),
    ]).subscribe(([maps, map]) => {
      map?.mapMarkers.push(mapMarker);
      this.maps.next(this.insertEntity(maps, map as Map));
    });
    return mapMarker;
  }

  getAll(sessionId: number): Observable<Map[]> {
    if (this.maps.value.length === 0 || this.sessionId !== sessionId) {
      this.sessionId = sessionId;
      return this.http
        .get<Map[]>(`${environment.backendUrl}/session/${sessionId}/map`)
        .pipe(
          tap((maps) => {
            this.maps.next(maps);
          }),
          switchMap(() => this.maps.asObservable())
        );
    }
    return this.maps.asObservable();
  }

  get(sessionId: number, mapId: number): Observable<Map | undefined> {
    return this.getAll(sessionId).pipe(
      map((sessions) => sessions.find((s) => s.id === mapId))
    );
  }

  getMapMarker(
    sessionId: number,
    mapId: number,
    mapMarkerId: number
  ): Observable<MapMarker | undefined> {
    return this.get(sessionId, mapId).pipe(
      map((map) => {
        if (!map) {
          return undefined;
        }
        return map.mapMarkers.find((mapMarker) => mapMarker.id === mapMarkerId);
      })
    );
  }

  updateMapMarker(
    mapMarkerId: number | undefined,
    mapMarkerDTO: Partial<MapMarkerDTO>
  ): Observable<unknown> {
    return this.http.patch(
      `${environment.backendUrl}/mapMarker/${mapMarkerId}`,
      mapMarkerDTO
    );
  }

  private insertEntity<T extends ID>(entities: T[], newEntity: T): T[] {
    if (!entities.find((e) => e.id === newEntity.id)) {
      return [...entities, newEntity];
    }
    const updatedEntities = entities.map((entity) => {
      return entity.id === newEntity.id ? newEntity : entity;
    });
    return updatedEntities;
  }
}
