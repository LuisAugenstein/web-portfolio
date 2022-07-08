import { Selectable } from '@dnd-history/shared-interfaces';
import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type SelectionAction = ActionCreator<
  string,
  (
    props: Omit<Selectable, 'loaded'>
  ) => Omit<Selectable, 'loaded'> & TypedAction<string>
>;

export const SELECT_SESSION = createSelectAction('Session');
export const SELECT_MAP = createSelectAction('Map');
export const SELECT_MAPMARKER = createSelectAction('MapMarker');


function createSelectAction(entityName: string): SelectionAction {
  return createAction(
    `Select ${entityName}`,
    props<Omit<Selectable, 'loaded'>>()
  );
}
