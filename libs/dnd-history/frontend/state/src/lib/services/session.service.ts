import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '@dnd-history/shared-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Session[]> {
    return this.http.get<Session[]>(`${environment.backendUrl}/session`);
  }

  post(session: Session): Observable<unknown> {
    return this.http.post<Session>(`${environment.backendUrl}/session`, session);
  }

}
