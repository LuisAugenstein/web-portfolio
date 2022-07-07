import { ActionReducerMap } from '@ngrx/store';
import {
  selectedSessionReducer,
} from '@dnd-history/frontend-state';

export const reducers: ActionReducerMap<unknown> = {
  selectedSession: selectedSessionReducer,
};
