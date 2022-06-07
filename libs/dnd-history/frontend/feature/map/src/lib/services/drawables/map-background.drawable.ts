import { Injectable } from '@angular/core';
import { UserPreferenceService } from '@dnd-history/frontend-services';
import { Map } from '@dnd-history/shared-interfaces';
import { CanvasUpdateService, Drawable } from './canvas-update.service';


@Injectable({ providedIn: 'root' })
export class MapBackgroundDrawable implements Drawable {
  map!: Map;

  constructor(
    userPreferenceService: UserPreferenceService,
    private readonly canvasUpdataService: CanvasUpdateService
  ) {
    userPreferenceService.subscribe<Map>('selectedMap', (map: Map) => {
      this.map = map;
      canvasUpdataService.update();
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.map) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas = this.canvasUpdataService.getCanvas();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = this.map.src;
  }
}
