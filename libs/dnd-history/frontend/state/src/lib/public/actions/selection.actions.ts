import { Selectable } from '@dnd-history/shared-interfaces';
import { createAction, props } from '@ngrx/store';

export const SELECT_SESSION = createSelectAction('Session');
export const SELECT_ADVENTURE = createSelectAction('Adventure');


function createSelectAction(entityName: string){
  return createAction(
    `Select ${entityName}`,
    props<Omit<Selectable, 'loaded'>>()
  )
}