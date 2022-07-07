import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  SELECT_MAP,
  SELECT_SESSION,
} from '../../public/actions/selection.actions';
import { SessionService } from '../../public/services/entity.services';
import { MapSelectionService, SessionSelectionService } from '../../public/services/selection.services';
import { SelectionService } from '../services/selection/selection.service';
import { SelectionEffects } from './selection.effects';

@Injectable()
export class SessionSelectionEffects extends SelectionEffects {
  constructor(
    private sessionService: SessionService,
    actions$: Actions,
    sessionSelectionService: SessionSelectionService
  ) {
    super(SELECT_SESSION, actions$, sessionSelectionService);
  }

  override ngrxOnInitEffects(): Action {
    this.sessionService.getAll();
    return super.ngrxOnInitEffects();
  }
}

@Injectable()
export class MapSelectionEffects extends SelectionEffects {
  constructor(actions$: Actions, mapSelectionService: MapSelectionService) {
    super(SELECT_MAP, actions$, mapSelectionService);
  }
}
