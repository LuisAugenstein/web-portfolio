import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MapComponent } from './map/map.component';
import { HeaderModule } from '@dnd-history/frontend-header';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { PinpointSidebarComponent } from './components/pinpoint-sidebar/pinpoint-sidebar.component';
import { MainContentComponent } from './components/canvas/canvas.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayerCheckboxComponent } from './components/toolbar/layer-checkbox/layer-checkbox.component';

import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

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
  ],
  declarations: [
    MapComponent,
    ImageCarouselComponent,
    PinpointSidebarComponent,
    MainContentComponent,
    ToolbarComponent,
    LayerCheckboxComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapModule {}
