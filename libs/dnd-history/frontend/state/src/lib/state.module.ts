import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataService } from '@ngrx/data';
import { AdventureDataService } from './private/services/data/adventure-data.service';
import {
  MapMarkerSelectionEffects,
  MapSelectionEffects,
  SessionSelectionEffects,
} from './private/effects/entity-selection.effects';
import { MapDataService } from './private/services/data/map-data.service.ts';
import { CharacterDataService } from './private/services/data/character-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([SessionSelectionEffects, MapSelectionEffects, MapMarkerSelectionEffects]),
  ],
  providers: [AdventureDataService, CharacterDataService, MapDataService],
})
export class StateModule {
  constructor(
    entityDataService: EntityDataService,
    adventureDataService: AdventureDataService,
    characterDataService: CharacterDataService,
    mapDataService: MapDataService
  ) {
    entityDataService.registerService('Adventure', adventureDataService);
    entityDataService.registerService('Character', characterDataService);
    entityDataService.registerService('Map', mapDataService);
  }
}
