import { Injectable } from '@angular/core';
import { PinPoint, PinPointDTO } from '@dnd-history/shared-interfaces';
import { HttpPinPointService } from '../http-services/http-pin-point.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class PinPointService extends StateService<PinPoint, PinPointDTO> {
  constructor(httpPinPointService: HttpPinPointService) {
    super(httpPinPointService);
  }
}
