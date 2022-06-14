import { Injectable } from '@angular/core';
import {
  MapService,
  SelectedMapService,
  SelectedSessionService,
} from '@dnd-history/frontend-services';
import { MenuItem } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ContextMenuService {
  readonly contextMenuItems: MenuItem[] = [
    {
      label: 'new MapMarker',
      icon: 'i i-marker',
      command: ({ originalEvent }: { originalEvent: MouseEvent }) => {
        console.log(originalEvent);

        const selectedSessionId = this.selectedSessionService.getId() as number;
        const selectedMapId = this.selectedMapService.getId() as number;
        // this.mapService.createMapMarker(selectedSessionId, selectedMapId, {
        //   x: originalEvent.offsetX,
        //   y: originalEvent.offsetY,
        //   name: '',
        //   description: '',
        // });
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
    },
  ];

  constructor(
    private readonly selectedSessionService: SelectedSessionService,
    private readonly selectedMapService: SelectedMapService,
    private readonly mapService: MapService
  ) {}
}
