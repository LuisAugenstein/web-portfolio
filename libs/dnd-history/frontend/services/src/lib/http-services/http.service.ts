import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@dnd-history/shared-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export type UrlType = 'read' | 'create' | 'update';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpService<T extends ID, TDTO> {
  constructor(private readonly http: HttpClient) {}

  abstract getEndpoint(type: UrlType): string;

  read(): Observable<T[]> {
    const url = `${environment.backendUrl}/${this.getEndpoint('read')}`;
    return this.http.get<T[]>(url);
  }

  create(dto?: TDTO): Observable<T> {
    const url = `${environment.backendUrl}/${this.getEndpoint('create')}`;
    return this.http.post(url, dto) as Observable<T>;
  }

  update(updated: T) {
    const url = `${environment.backendUrl}/${this.getEndpoint('update')}/${updated.id}`;
    return this.http.put(url, updated);
  }
}
