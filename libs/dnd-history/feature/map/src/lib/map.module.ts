import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { HeaderModule } from '@web-portfolio/dnd-history-header';

@NgModule({
  imports: [CommonModule, HeaderModule],
  declarations: [MapComponent],
})
export class MapModule {}
