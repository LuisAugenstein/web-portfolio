import { Injectable } from '@angular/core';
import { Adventure, AdventureDTO } from '@dnd-history/shared-interfaces';
import { HttpAdventureService } from '../http-services/http-adventure.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class AdventureService extends StateService<Adventure, AdventureDTO> {
  constructor(httpAdventureService: HttpAdventureService) {
    super(httpAdventureService);
  }
}
