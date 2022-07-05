import { ID, Selectable, Session } from '@dnd-history/shared-interfaces';
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectSelectedSession = createSelector(
  (state: AppState) => state.selectedSession,
  (state: AppState) => state.sessions,
  (selectedSession: Selectable, sessions: Session[]) => {
    return sessions.find((s) => s.id === selectedSession.id);
  }
);
