import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import { Observable} from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root',
})
export class SessionService {

  constructor(private http: HttpClient) {
  }

  read(): Observable<Session[]> {
    return this.http.get<Session[]>(`${environment.backendUrl}/session`);
  }

  create(sessionDTO: SessionDTO): Observable<Session> {
    return this.http.post(
      `${environment.backendUrl}/session`,
      sessionDTO
    ) as Observable<Session>;
  }
}
