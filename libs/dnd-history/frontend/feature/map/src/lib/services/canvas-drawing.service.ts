import { Injectable } from '@angular/core';
import { CanvasUpdateService } from './drawables/canvas-update.service';
import { MapBackgroundDrawable } from './drawables/map-background.drawable';


@Injectable({ providedIn: 'root' })
export class CanvasDrawingService {

  

  constructor(
    private readonly canvasUpdateService: CanvasUpdateService,
    mapBackgroundDrawable: MapBackgroundDrawable,
  ) {
    this.canvasUpdateService.register('map-background', mapBackgroundDrawable);
    // this.canvasUpdateService.register('pin-points', PinPointDrawable);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvasUpdateService.setCanvas(canvas);
  }
}
