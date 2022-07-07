import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SELECT_SESSION } from '../actions/selection.actions';
import { SessionSelectionService } from '../services/selection-services/session-selection.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class SessionEffects implements OnInitEffects {
  selectSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SELECT_SESSION),
        map(({ id }) => this.sessionSelectionService.set({ id, loaded: true}))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionService,
    private sessionSelectionService: SessionSelectionService
  ) {}

  ngrxOnInitEffects(): Action {
    this.sessionService.getAll();
    return {
      type: SELECT_SESSION.type,
      id: this.sessionSelectionService.get().id,
    } as Action;
  }
}
