import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map, MapDTO } from '@dnd-history/shared-interfaces';
import { SelectedSessionService } from '../selection-services/selected-session.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class MapService extends StateService<Map, MapDTO> {
  protected readUrl!: string;
  protected createUrl!: string;
  protected updateUrl!: string;

  constructor(
    http: HttpClient,
    selectedSessionService: SelectedSessionService
  ) {
    super(http);
    selectedSessionService.subscribe((selectedSession) => {
      if(!selectedSession){
        this.reset();
        return;
      }
      this.readUrl = `session/${selectedSession.id}/map`;
      this.createUrl = `session/${selectedSession.id}/map`;
      this.updateUrl = 'map';
      this.refresh();
    });
  }
}
