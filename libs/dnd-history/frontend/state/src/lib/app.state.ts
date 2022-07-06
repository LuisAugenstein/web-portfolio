import { Adventure, Selectable, Session } from '@dnd-history/shared-interfaces';

export interface AppState {
  selectedSession: Selectable;
  sessions: Session[];
  adventures: Adventure[];
}