import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { HeaderModule } from '@dnd-history/frontend-header';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { PinpointSidebarComponent } from './pinpoint-sidebar/pinpoint-sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';

import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  imports: [CommonModule, HeaderModule, FileUploadModule],
  declarations: [
    MapComponent,
    ImageCarouselComponent,
    PinpointSidebarComponent,
    MainContentComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapModule {}
