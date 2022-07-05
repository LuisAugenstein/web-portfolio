// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Id, Session, SessionDTO } from '@dnd-history/shared-interfaces';
// import {
//   BehaviorSubject,
//   filter,
//   from,
//   lastValueFrom,
//   map,
//   Observable,
//   Observer,
//   of,
//   Subscription,
//   switchMap,
//   tap,
// } from 'rxjs';
// import { environment } from '../../environment/environment';

// @Injectable({ providedIn: 'root' })
// export class SessionService {
//   private sessions = new BehaviorSubject<Session[]>([]);

//   constructor(private readonly http: HttpClient) {}

//   create(dto?: SessionDTO): Observable<Session> {
//     return (
//       this.http.post(
//         `${environment.backendUrl}/session`,
//         dto
//       ) as Observable<Session>
//     ).pipe(
//       tap((session) => {
//         this.getAll().subscribe((sessions) => {
//           this.sessions.next(this.insertEntity(sessions, session));
//         });
//       })
//     );
//   }

//   getAll(): Observable<Session[]> {
//     if (this.sessions.value.length === 0) {
//       return this.http.get<Session[]>(`${environment.backendUrl}/session`).pipe(
//         tap((sessions) => {
//           this.sessions.next(sessions);
//         }),
//         switchMap(() => this.sessions.asObservable())
//       );
//     }
//     return this.sessions.asObservable();
//   }

//   get(id: number | undefined): Observable<Session | undefined> {
//     return this.getAll().pipe(
//       map((sessions) => sessions.find((s) => s.id === id))
//     );
//   }

//   private insertEntity<T extends Id>(entities: T[], newEntity: T): T[] {
//     if (!entities.find((e) => e.id === newEntity.id)) {
//       return [...entities, newEntity];
//     }
//     const updatedEntities = entities.map((entity) => {
//       return entity.id === newEntity.id ? newEntity : entity;
//     });
//     return updatedEntities;
//   }
// }
