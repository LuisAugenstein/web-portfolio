import { Selectable } from '@dnd-history/shared-interfaces';
import { EntityCache } from '@ngrx/data';

export interface AppState {
  entityCache: EntityCache;
  selectedSession: Selectable;
}