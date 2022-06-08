import { Injectable } from '@angular/core';
import { PinPointService } from '@dnd-history/frontend-services';
import { CanvasDrawingService } from '../../drawing/canvas-drawing.service';
import { ToolBarButton } from '../palette.service';

@Injectable({ providedIn: 'root' })
export class PlacePinPointButton implements ToolBarButton {
  readonly name = 'place-pin-point';
  readonly toolTip = 'place a new pin point';
  readonly onIcon = 'i i-marker';
  readonly offIcon = 'i i-marker';
  active = false;

  private readonly onClick = ((event: MouseEvent) => {
    const canvas = this.canvasDrawingService.getCanvas();
    this.pinPointService
      .create({
        name: '',
        description: '',
        x: Math.round((event.offsetX / canvas.clientWidth) * canvas.width),
        y: Math.round((event.offsetY / canvas.clientHeight) * canvas.height),
      })
      .subscribe();
    this.deactivate();
  }).bind(this);

  constructor(
    private readonly canvasDrawingService: CanvasDrawingService,
    private readonly pinPointService: PinPointService
  ) {}

  deactivate(): void {
    this.active = false;
    this.canvasDrawingService
      .getCanvas()
      .removeEventListener('click', this.onClick);
  }
  activate(): void {
    this.active = true;
    this.canvasDrawingService
      .getCanvas()
      .addEventListener('click', this.onClick);
  }
}
