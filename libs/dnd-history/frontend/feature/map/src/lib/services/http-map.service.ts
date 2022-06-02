import { HttpClient } from '@angular/common/http';
import { Map, MapDTO } from '@dnd-history/shared-interfaces';
import { Observable } from 'rxjs';
import { environment, SessionService } from '@dnd-history/frontend-services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HTTPMapService {
  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService
  ) {}

  read(): Observable<Map[]> {
    return this.http.get<Map[]>(
      `${environment.backendUrl}/session/${
        this.sessionService.getCurrentSession().id
      }/map`
    );
  }

  create(mapDTO: MapDTO): Observable<Map> {
    return this.http.post(
      `${environment.backendUrl}/session/${
        this.sessionService.getCurrentSession().id
      }/map`,
      mapDTO
    ) as Observable<Map>;
  }
}
