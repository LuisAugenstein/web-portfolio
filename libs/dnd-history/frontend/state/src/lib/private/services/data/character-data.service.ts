import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, Session } from '@dnd-history/shared-interfaces';
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { AppState } from '../../../app.state';
import { selectSession } from '../../../public/selectors/entity.selectors';

@Injectable()
export class CharacterDataService extends DefaultDataService<Character> {
  constructor(
    private store: Store<AppState>,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    config?: DefaultDataServiceConfig
  ) {
    super('Character', http, httpUrlGenerator, config);
  }

  override add(character: Character): Observable<Character> {
    if (character === undefined) {
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
        this.execute('POST', this.entityUrl, character, { params })
      )
    );
  }
}
