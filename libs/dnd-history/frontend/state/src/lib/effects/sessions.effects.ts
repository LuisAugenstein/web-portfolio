import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, from } from 'rxjs';
import { map, catchError, switchMap, concatMap, tap } from 'rxjs/operators';
import {
  addSession,
  LOADED_SESSIONS,
  loadSessions,
  LOAD_SESSIONS,
  selectSession,
  SELECT_SESSION,
} from '../actions/sessions.actions';
import { SessionSelectionService } from '../services/selection-services/session-selection.service';
import { SessionsService } from '../services/session.service';

@Injectable()
export class SessionEffects implements OnInitEffects {
  loadSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSessions),
      switchMap(() =>
        this.sessionService.getAll().pipe(
          map((sessions) => ({
            type: LOADED_SESSIONS,
            entities: sessions,
          })),
          // TODO: send error action '[Sessions API] Sessions Loaded Error'
          catchError(() => EMPTY)
        )
      )
    )
  );

  addSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSession),
        concatMap(({ entity }) => this.sessionService.post(entity))
      ),
    { dispatch: false }
  );

  selectSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(selectSession),
        map(({ id }) => this.sessionSelectionService.set({ id }))
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[SessionEffects]: Init'),
      switchMap(() =>
        from([
          { type: LOAD_SESSIONS },
          { type: SELECT_SESSION, id: this.sessionSelectionService.get().id },
        ])
      )
    )
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionsService,
    private sessionSelectionService: SessionSelectionService
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: '[SessionEffects]: Init' };
  }
}
