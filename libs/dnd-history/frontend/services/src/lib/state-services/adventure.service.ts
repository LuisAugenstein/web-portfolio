import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adventure, AdventureDTO } from '@dnd-history/shared-interfaces';
import { SelectedSessionService } from '../selection-services/selected-session.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class AdventureService extends StateService<Adventure, AdventureDTO> {
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
        return;
      }
      this.readUrl = `session/${selectedSession.id}/adventure`;
      this.createUrl = `session/${selectedSession.id}/adventure`;
      this.updateUrl = 'adventure';
      this.refresh();
    });
  }
}
