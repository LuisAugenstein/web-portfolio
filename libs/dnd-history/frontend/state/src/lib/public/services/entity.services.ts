import { Injectable } from '@angular/core';
import { Adventure, Session } from '@dnd-history/shared-interfaces';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SessionService extends EntityCollectionServiceBase<Session> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Session', serviceElementsFactory);
  }
}

@Injectable({ providedIn: 'root' })
export class AdventureService extends EntityCollectionServiceBase<Adventure> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Adventure', serviceElementsFactory);
  }
}