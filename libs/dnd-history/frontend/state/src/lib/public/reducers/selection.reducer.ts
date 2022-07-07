import { Selectable } from '@dnd-history/shared-interfaces';
import { createReducer, on } from '@ngrx/store';
import {
  SelectionAction,
  SELECT_MAP,
  SELECT_SESSION,
} from '../actions/selection.actions';

export const selectedSessionReducer = createSelectionReducer(SELECT_SESSION);
export const selectedMapReducer = createSelectionReducer(SELECT_MAP);
export function createSelectionReducer(selectionAction: SelectionAction) {
  return createReducer<Readonly<Selectable>>(
    {
      loaded: false,
      id: undefined,
    },
    on(selectionAction, (_state, { id }) => ({ loaded: true, id }))
  );
}
