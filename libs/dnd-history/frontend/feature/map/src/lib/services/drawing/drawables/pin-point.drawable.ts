import { Injectable } from '@angular/core';
import { PinPointService } from '@dnd-history/frontend-services';
import { CanvasDrawingService, Drawable } from '../canvas-drawing.service';

const PIN_POINT_SRC = '/assets/icons/marker.svg';
const PIN_POINT_SIZE = 48;

@Injectable({ providedIn: 'root' })
export class PinPointsDrawable implements Drawable {
  constructor(
    canvasDrawingService: CanvasDrawingService,
    private readonly pinPointService: PinPointService
  ) {
    this.pinPointService.read().subscribe(() => canvasDrawingService.update());
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const pinPoint of this.pinPointService.read().value) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(
          img,
          pinPoint.x - PIN_POINT_SIZE / 2,
          pinPoint.y - PIN_POINT_SIZE,
          PIN_POINT_SIZE,
          PIN_POINT_SIZE
        );
      };
      img.src = PIN_POINT_SRC;
    }
  }
}
