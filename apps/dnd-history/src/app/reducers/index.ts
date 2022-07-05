import { ActionReducerMap } from '@ngrx/store';
import {
  selectedSessionReducer,
  sessionsReducer,
} from '@dnd-history/frontend-state';

export const reducers: ActionReducerMap<unknown> = {
  sessions: sessionsReducer,
  selectedSession: selectedSessionReducer,
};
