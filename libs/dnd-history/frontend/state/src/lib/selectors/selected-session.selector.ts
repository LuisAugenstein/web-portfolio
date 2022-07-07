import { Selectable, Session } from '@dnd-history/shared-interfaces';
import { EntityCollection } from '@ngrx/data';
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectSelectedSession = createSelector(
  (state: AppState) => state.selectedSession,
  (state: AppState) => state.entityCache['Session'],
  (selectedSession: Selectable, sessions: EntityCollection<Session>) => {
    return selectedSession.id && sessions.loaded
      ? sessions.entities[selectedSession.id]
      : undefined;
  }
);
