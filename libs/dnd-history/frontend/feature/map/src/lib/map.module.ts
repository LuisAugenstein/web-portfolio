import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MapComponent } from './map/map.component';
import { HeaderModule } from '@dnd-history/frontend-header';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { MapMarkerSidebarComponent } from './components/map-marker-sidebar/map-marker-sidebar.component';
import { CanvasComponent } from './components/canvas/canvas.component';

import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import {ContextMenuModule} from 'primeng/contextmenu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    FileUploadModule,
    ToolbarModule,
    ToggleButtonModule,
    CheckboxModule,
    TooltipModule,
    ContextMenuModule
  ],
  declarations: [
    MapComponent,
    ImageCarouselComponent,
    MapMarkerSidebarComponent,
    CanvasComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapModule {}
