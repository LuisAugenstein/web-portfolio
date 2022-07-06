import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adventure, NanoId } from '@dnd-history/shared-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AdventureService {
  constructor(private http: HttpClient) {}

  getAll(sessionId: NanoId): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(
      `${environment.backendUrl}/session/${sessionId}/adventure`
    );
  }

  post(sessionId: NanoId, adventure: Adventure): Observable<unknown> {
    return this.http.post<Adventure>(
      `${environment.backendUrl}/session/${sessionId}/adventure`,
      adventure
    );
  }
}
