import { Selectable } from '@dnd-history/shared-interfaces';
import { createReducer, on } from '@ngrx/store';
import { SESSION_ACTIONS } from '../../actions/sessions.actions';

const initialState: Readonly<Selectable> = {
  id: 'loading',
};
export const selectedSessionReducer = createReducer(
  initialState,
  on(SESSION_ACTIONS.SELECT, (_state, { id }) => {
    return { id };
  })
);
