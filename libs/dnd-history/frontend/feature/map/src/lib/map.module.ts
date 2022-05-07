import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { HeaderModule } from '@dnd-history/frontend-header';

@NgModule({
  imports: [CommonModule, HeaderModule],
  declarations: [MapComponent],
})
export class MapModule {}
