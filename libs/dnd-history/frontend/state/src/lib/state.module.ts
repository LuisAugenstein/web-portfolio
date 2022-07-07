import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './private/effects/sessions.effects';
import { EntityDataService } from '@ngrx/data';
import { AdventureDataService } from './private/services/data/adventure-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([SessionEffects]),
  ],
  providers: [ AdventureDataService ]
})
export class StateModule {
  constructor(
    entityDataService: EntityDataService,
    adventureDataService: AdventureDataService
  ) {
    entityDataService.registerService('Adventure', adventureDataService);
  }
}
