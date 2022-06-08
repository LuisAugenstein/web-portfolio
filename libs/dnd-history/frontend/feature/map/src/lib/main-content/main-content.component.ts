import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CanvasDrawingService } from '../services/drawing/canvas-drawing.service';
import { MapBackgroundDrawable } from '../services/drawing/drawables/map-background.drawable';
import { PinPointsDrawable } from '../services/drawing/drawables/pin-point.drawable';

@Component({
  selector: 'dnd-history-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements AfterViewInit {
  @ViewChild('mapCanvas')
  mapCanvas!: ElementRef<HTMLCanvasElement>;
  selectedTool!: any;

  tools = [
    {
      name: 'create marker',
    },
    {
      name: 'move marker',
    },
    {
      name: 'connect marker',
    },
  ];

  constructor(
    private readonly canvasDrawingService: CanvasDrawingService,
    mapBackgroundDrawable: MapBackgroundDrawable,
    pinPointsDrawable: PinPointsDrawable
  ) {
    canvasDrawingService.register('map-background', mapBackgroundDrawable);
    canvasDrawingService.register('pin-points', pinPointsDrawable);
  }

  ngAfterViewInit(): void {
    this.canvasDrawingService.setCanvas(this.mapCanvas.nativeElement);
  }
}
