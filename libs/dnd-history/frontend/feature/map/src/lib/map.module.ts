import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { HeaderModule } from '@dnd-history/frontend-header';

@NgModule({
  imports: [CommonModule, HeaderModule],
  declarations: [MapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapModule {}
