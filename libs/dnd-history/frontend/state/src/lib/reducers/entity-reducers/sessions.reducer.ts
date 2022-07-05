import { Session } from '@dnd-history/shared-interfaces';
import {
  addSession,
  removeSession,
  loadedSessions,
} from '../../actions/sessions.actions';
import { createDefaultReducer } from './entity.reducer';

export const sessionsReducer = createDefaultReducer<Session>(
  addSession,
  loadedSessions,
  removeSession,
);

