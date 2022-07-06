import { Adventure } from '@dnd-history/shared-interfaces';
import { EntityActions } from './entity.actions';
class AdventureActions extends EntityActions<Adventure> {
  LOAD = this.createLoadAction();
  LOADED = this.createLoadedAction();
  ADD = this.createAddAction();
  UPDATE = this.createUpdateAction();
  REMOVE = this.createRemoveAction();
  SELECT = undefined;

  constructor() {
    super('Adventure');
  }
}

export const ADVENTURE_ACTIONS = new AdventureActions();
