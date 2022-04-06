import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeCardComponent } from './home-card/home-card.component';

import {CardModule} from 'primeng/card';

@NgModule({
  imports: [CommonModule, RouterModule, CardModule],
  declarations: [
    HomeComponent,
    HomeCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
