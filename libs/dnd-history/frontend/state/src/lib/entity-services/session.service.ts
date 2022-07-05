import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Session } from '@dnd-history/shared-interfaces';
 
@Injectable({ providedIn: 'root' })
export class SessionService extends EntityCollectionServiceBase<Session> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Session', serviceElementsFactory);
  }
}