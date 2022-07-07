import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Adventure,
  AdventureDTO,
  ID,
  MapDTO,
} from '@dnd-history/shared-interfaces';
import {
  BehaviorSubject,
  map,
  Observable,
  Observer,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
class AdventureService {
  private adventures = new BehaviorSubject<Adventure[]>([]);
  private sessionId?: number;

  constructor(private readonly http: HttpClient) {}

  create(
    sessionId: number,
    adventureDTO?: AdventureDTO
  ): Observable<Adventure> {
    return (
      this.http.post(
        `${environment.backendUrl}/session/${sessionId}/adventure`,
        adventureDTO
      ) as Observable<Adventure>
    ).pipe(
      tap((adventure) => {
        this.adventures.next(
          this.insertEntity(this.adventures.value, adventure)
        );
      })
    );
  }

  getAll(sessionId: number): Observable<Adventure[]> {
    if (this.adventures.value.length === 0 || this.sessionId !== sessionId) {
      this.sessionId = sessionId;
      return this.http
        .get<Adventure[]>(
          `${environment.backendUrl}/session/${sessionId}/adventure`
        )
        .pipe(
          tap((adventures) => {
            this.adventures.next(adventures);
          }),
          switchMap(() => this.adventures.asObservable())
        );
    }
    return this.adventures.asObservable();
  }

  get(
    sessionId: number,
    adventureId: number | undefined
  ): Observable<Adventure | undefined> {
    return this.getAll(sessionId).pipe(
      map((sessions) => sessions.find((s) => s.id === adventureId))
    );
  }

  update(
    adventureId: number,
    adventureDTO: Partial<AdventureDTO>
  ): Observable<unknown> {
    this.insertEntity(this.adventures.value, {id: adventureId, ...adventureDTO})
    return this.http.patch(
      `${environment.backendUrl}/adventure/${adventureId}`,
      adventureDTO
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
