import { Injectable } from '@angular/core';
import { HttpPinPointService, UserPreferenceService } from '@dnd-history/frontend-services';
import { Map, PinPoint } from '@dnd-history/shared-interfaces';
import { CanvasUpdateService, Drawable } from './canvas-update.service';


@Injectable({ providedIn: 'root' })
export class MapBackgroundDrawable implements Drawable {

  constructor(
    httpPinPointService: HttpPinPointService
  ) {
    httpPinPointService.read().subscribe((pinPoints) => {
        this.pinPoints = pinPoints;
        canvasUpdataService.update();
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.map) {
      return;
    }
    const { width, height } = canvasInformation.dimension;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = this.map.src;
  }
}
