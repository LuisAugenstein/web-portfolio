import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import {CardModule} from 'primeng/card';
import { HeaderModule } from '@web-portfolio/dnd-history/header';

@NgModule({
  imports: [CommonModule, RouterModule, CardModule, HeaderModule],
  declarations: [
    HomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
