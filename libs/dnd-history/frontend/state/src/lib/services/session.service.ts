import { Injectable } from '@angular/core';
import { Session } from '@dnd-history/shared-interfaces';
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
