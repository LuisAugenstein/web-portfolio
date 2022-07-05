import { Selectable } from '@dnd-history/shared-interfaces';
import { createReducer, on } from '@ngrx/store';
import { selectSession } from '../../actions/sessions.actions';

const initialState: Readonly<Selectable> = {
  id: 'loading',
};
export const selectedSessionReducer = createReducer(
  initialState,
  on(selectSession, (_state, { id }) => {
    return { id };
  })
);
