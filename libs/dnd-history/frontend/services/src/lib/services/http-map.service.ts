import { HttpClient } from '@angular/common/http';
import { Map, MapDTO, Session } from '@dnd-history/shared-interfaces';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserPreferenceService } from './user-preferences-service';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class HTTPMapService {
  constructor(
    private readonly http: HttpClient,
    private readonly userPreferenceService: UserPreferenceService
  ) {}

  read(): Observable<Map[]> {
    return this.http.get<Map[]>(
      `${environment.backendUrl}/session/${
        this.userPreferenceService.get<Session>('selectedSession')?.id
      }/map`
    );
  }

  create(mapDTO: MapDTO): Observable<Map> {
    return this.http.post(
      `${environment.backendUrl}/session/${
        this.userPreferenceService.get<Session>('selectedSession')?.id
      }/map`,
      mapDTO
    ) as Observable<Map>;
  }
}
