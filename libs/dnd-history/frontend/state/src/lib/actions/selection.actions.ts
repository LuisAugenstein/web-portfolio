import { Selectable } from '@dnd-history/shared-interfaces';
import { createAction, props } from '@ngrx/store';

export const SELECT_SESSION = createAction(
  `Select Session`,
  props<Omit<Selectable, 'loaded'>>()
);
