import { ActionReducerMap } from '@ngrx/store';
import {
  selectedMapReducer,
  selectedSessionReducer,
} from '@dnd-history/frontend-state';

export const reducers: ActionReducerMap<unknown> = {
  selectedSession: selectedSessionReducer,
  selectedMap: selectedMapReducer
};
