import { Session } from '@dnd-history/shared-interfaces';
import { EntityActions } from './entity.actions';
class SessionsActions extends EntityActions<Session> {
  LOAD = this.createLoadAction();
  LOADED = this.createLoadedAction();
  ADD = this.createAddAction();
  UPDATE = undefined;
  REMOVE = this.createRemoveAction();
  SELECT = this.createSelectAction();

  constructor() {
    super('Session');
  }
}

export const SESSION_ACTIONS = new SessionsActions();