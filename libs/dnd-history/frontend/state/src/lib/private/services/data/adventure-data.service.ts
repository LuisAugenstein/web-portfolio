import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adventure, Session } from '@dnd-history/shared-interfaces';
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { AppState } from '../../../app.state';
import { selectSession } from '../../../public/selectors/entity.selectors';

@Injectable()
export class AdventureDataService extends DefaultDataService<Adventure> {
  constructor(
    private store: Store<AppState>,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    config?: DefaultDataServiceConfig
  ) {
    super('Adventure', http, httpUrlGenerator, config);
  }

  override add(adventure: Adventure): Observable<Adventure> {
    if (adventure === undefined) {
      return this.execute(
        'POST',
        this.entityUrl,
        new Error(`No "${this.entityName}" entity to add`)
      );
    }
    return this.store.select(selectSession).pipe(
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
