import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adventure, Session } from '@dnd-history/shared-interfaces';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { AppState } from '../../../app.state';
import { selectSelectedSession } from '../../../public/selectors/selected-session.selector';

@Injectable()
export class AdventureDataService extends DefaultDataService<Adventure> {
  constructor(
    private store: Store<AppState>,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Adventure', http, httpUrlGenerator);
  }

  override add(adventure: Adventure): Observable<Adventure> {
    if (adventure === undefined) {
      return this.execute(
        'POST',
        this.entityUrl,
        new Error(`No "${this.entityName}" entity to add`)
      );
    }
    return this.store.select(selectSelectedSession).pipe(
      take(1),
      filter((selectedSession) => selectedSession !== undefined),
      map(
        (selectededSession) =>
          new HttpParams({
            fromObject: { sessionId: (selectededSession as Session).id },
          })
      ),
      switchMap((params) =>
        this.execute('POST', this.entityUrl, adventure, { params })
      )
    );
  }
}