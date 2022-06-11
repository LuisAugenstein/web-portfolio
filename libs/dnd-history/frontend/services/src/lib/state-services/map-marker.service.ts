import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapMarker, MapMarkerDTO } from '@dnd-history/shared-interfaces';
import { SelectedMapService } from '../selection-services/selected-map.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class MapMarkerService extends StateService<MapMarker, MapMarkerDTO> {
  protected readUrl!: string;
  protected createUrl!: string;
  protected updateUrl!: string;

  constructor(http: HttpClient, selectedMapService: SelectedMapService) {
    super(http);
    selectedMapService.subscribe((selectedMap) => {
      if(!selectedMap){
        this.reset();
        return;
      }
      this.readUrl = `map/${selectedMap.id}/mapMarker`;
      this.createUrl = `map/${selectedMap.id}/mapMarker`;
      this.updateUrl = 'map';
      this.refresh();
    });
  }
}
