import { ID, Selectable, Session } from '@dnd-history/shared-interfaces';
import { createAction, props } from '@ngrx/store';


export const LOAD_SESSIONS = '[Login] Load Sessions';
export const LOADED_SESSIONS = '[Sessions API] Loaded Sessions Success';
export const ADD_SESSION = '[Login] Add Session';
export const REMOVE_SESSION = '[Home] Remove Session';
export const SELECT_SESSION = '[Login] Select Session';

export const loadSessions = createAction(LOAD_SESSIONS);
export const loadedSessions = createAction(
  LOADED_SESSIONS,
  props<{ entities: ReadonlyArray<Session> }>()
);
export const addSession = createAction(
    ADD_SESSION,
    props<{ entity: Session }>()
  );
export const removeSession = createAction(REMOVE_SESSION, props<ID>());
export const selectSession = createAction(SELECT_SESSION, props<Selectable>());
