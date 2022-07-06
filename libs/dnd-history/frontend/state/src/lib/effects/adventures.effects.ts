import { Injectable } from '@angular/core';
import {
  Actions,
  concatLatestFrom,
  createEffect,
  ofType,
  OnInitEffects,
} from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, from } from 'rxjs';
import { map, catchError, switchMap, concatMap, filter } from 'rxjs/operators';
import { ADVENTURE_ACTIONS } from '../actions/adventures.actions';
import { AppState } from '../app.state';
import { AdventureService } from '../services/adventure.service';

@Injectable()
export class AdventureEffects implements OnInitEffects {
  loadAdventures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ADVENTURE_ACTIONS.LOAD),
      concatLatestFrom(() =>
        this.store.select((state) => state.selectedSession)
      ),
      filter(
        ([, selectedSession]) =>
          selectedSession.id !== 'loading' && selectedSession !== undefined
      ),
      switchMap(([, selectedSession]) =>
        this.adventureService.getAll(selectedSession.id as string).pipe(
          map((adventures) => ({
            type: ADVENTURE_ACTIONS.LOADED.type,
            entities: adventures,
          })),
          // TODO: send error action '[Sessions API] Sessions Loaded Error'
          catchError(() => EMPTY)
        )
      )
    )
  );

  addAdventure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ADVENTURE_ACTIONS.ADD),
        concatLatestFrom(() =>
          this.store.select((state) => state.selectedSession)
        ),
        filter(
          ([, selectedSession]) =>
            selectedSession.id !== 'loading' && selectedSession !== undefined
        ),
        concatMap(([{ entity }, selectedSession]) =>
          this.adventureService.post(selectedSession.id as string, entity)
        )
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[AdventureEffects]: Init'),
      switchMap(() => from([{ type: ADVENTURE_ACTIONS.LOAD.type }]))
    )
  );

  constructor(
    private actions$: Actions,
    private adventureService: AdventureService,
    private store: Store<AppState>
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: '[AdventureEffects]: Init' };
  }
}
