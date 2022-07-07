import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SelectionAction } from '../../public/actions/selection.actions';
import { SelectionService } from '../services/selection/selection.service';

export abstract class SelectionEffects implements OnInitEffects {
  select$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(this.selectionAction),
        map(({ id }) => this.selectionService.set({ id, loaded: true }))
      ),
    { dispatch: false }
  );

  constructor(
    private selectionAction: SelectionAction,
    private actions$: Actions,
    private selectionService: SelectionService
  ) {}

  ngrxOnInitEffects(): Action {
    return {
      type: this.selectionAction.type,
      id: this.selectionService.get().id,
    } as Action;
  }
}
