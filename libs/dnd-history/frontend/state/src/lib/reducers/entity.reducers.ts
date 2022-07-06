import { ID } from '@dnd-history/shared-interfaces';
import { ActionCreator, createReducer, on, ReducerTypes } from '@ngrx/store';
import { ADVENTURE_ACTIONS } from '../actions/adventures.actions';
import { IEntityActions } from '../actions/entity.actions';
import { SESSION_ACTIONS } from '../actions/sessions.actions';

export const sessionsReducer = createEntityReducer(SESSION_ACTIONS);
export const adventuresReducer = createEntityReducer(ADVENTURE_ACTIONS);


/**
 * default reducer that operates on a list of entities.
 * @param actions LOADED, ADD, UPDATE, or REMOVE actions are supported. other actions are ignored.
 */
function createEntityReducer<E extends ID>(actions: IEntityActions<E>) {
  const initialState: ReadonlyArray<E> = [];
  const ons: ReducerTypes<readonly E[], readonly ActionCreator[]>[] = [];
  if (actions.LOADED) {
    ons.push(on(actions.LOADED, (_state, { entities }) => entities));
  }
  if (actions.ADD) {
    ons.push(
      on(actions.ADD, (state, { entity }) => {
        if (state.find(({ id }) => id === entity.id)) {
          return state;
        }
        return [...state, entity];
      })
    );
  }
  if (actions.UPDATE) {
    ons.push(
      on(actions.UPDATE, (state, { entity }) =>
        state.map((e) => (e.id === entity.id ? entity : e))
      )
    );
  }
  if (actions.REMOVE) {
    ons.push(
      on(actions.REMOVE, (state, { id }) =>
        state.filter((entity) => entity.id !== id)
      )
    );
  }
  return createReducer(initialState, ...ons);
}
