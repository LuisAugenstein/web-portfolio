import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map, Session } from '@dnd-history/shared-interfaces';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { filter, map as mapOp, Observable, switchMap, take } from 'rxjs';
import { AppState } from '../../../app.state';
import { selectSession } from '../../../public/selectors/entity.selectors';

@Injectable()
export class MapDataService extends DefaultDataService<Map> {
  constructor(
    private store: Store<AppState>,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Map', http, httpUrlGenerator);
  }

  override add(map: Map): Observable<Map> {
    if (map === undefined) {
      return this.execute(
        'POST',
        this.entityUrl,
        new Error(`No "${this.entityName}" entity to add`)
      );
    }
    return this.store.select(selectSession).pipe(
      take(1),
      filter((selectedSession) => selectedSession !== undefined),
      mapOp(
        (selectededSession) =>
          new HttpParams({
            fromObject: { sessionId: (selectededSession as Session).id },
          })
      ),
      switchMap((params) =>
        this.execute('POST', this.entityUrl, map, { params })
      )
    );
  }
}
