import { Injectable } from '@angular/core';
import { UserPreferenceService } from '@dnd-history/frontend-services';
import { Map } from '@dnd-history/shared-interfaces';
import { CanvasDrawingService, Drawable } from '../canvas-drawing.service';

@Injectable({ providedIn: 'root' })
export class MapBackgroundDrawable implements Drawable {
  private map!: Map;

  private width!: number;
  private height!: number;
  

  constructor(
    userPreferenceService: UserPreferenceService,
    private readonly canvasDrawingService: CanvasDrawingService
  ) {
    const canvas = this.canvasDrawingService.getCanvas();
    userPreferenceService.subscribe<Map>('selectedMap', (map: Map) => {
      this.map = map;
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.map) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas = this.canvasDrawingService.getCanvas();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = this.map.src;
  }
}
