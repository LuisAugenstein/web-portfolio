import { Injectable } from '@angular/core';
import { Map, MapDTO } from '@dnd-history/shared-interfaces';
import { HTTPMapService } from '../http-services/http-map.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class MapService extends StateService<Map, MapDTO> {
  constructor(httpMapService: HTTPMapService) {
    super(httpMapService);
  }
}