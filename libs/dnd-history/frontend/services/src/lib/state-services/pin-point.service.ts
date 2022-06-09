import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PinPoint, PinPointDTO } from '@dnd-history/shared-interfaces';
import { SelectedMapService } from '../selection-services/selected-map.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class PinPointService extends StateService<PinPoint, PinPointDTO> {
  protected readUrl!: string;
  protected createUrl!: string;
  protected updateUrl!: string;

  constructor(http: HttpClient, selectedMapService: SelectedMapService) {
    super(http);
    selectedMapService.subscribe((selectedMap) => {
      if(!selectedMap){
        return;
      }
      this.readUrl = `map/${selectedMap.id}/pinPoint`;
      this.createUrl = `map/${selectedMap.id}/pinPoint`;
      this.updateUrl = 'map';
      this.refresh();
    });
  }
}
