import { Selectable } from '@dnd-history/shared-interfaces';
import { createReducer, on } from '@ngrx/store';
import { SELECT_SESSION } from '../actions/selection.actions';

const initialState: Readonly<Selectable> = {
  loaded: false,
  id: undefined,
};
export const selectedSessionReducer = createReducer<Readonly<Selectable>>(
  initialState,
  on(SELECT_SESSION, (_state, { id }) => {
    return { loaded: true, id};
  })
);
