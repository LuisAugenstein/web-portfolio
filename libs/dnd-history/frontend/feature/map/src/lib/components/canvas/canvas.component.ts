import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Konva from 'konva';
import { StageConfig } from 'konva/lib/Stage';
import { MapDrawingService } from './drawing-services/map-drawing.service';
import { MapMarkerDrawingService } from './drawing-services/map-marker-drawing.service';

@Component({
  selector: 'dnd-history-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('konvaContainer')
  konvaContainer!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly mapDrawingService: MapDrawingService,
    private readonly mapMarkerDrawingService: MapMarkerDrawingService
  ) {}

  ngAfterViewInit(): void {
    const parentElement = this.konvaContainer.nativeElement
      .parentElement as HTMLElement;
    const stageConfig: StageConfig = {
      width: parentElement.offsetWidth,
      height: parentElement.offsetHeight,
      container: this.konvaContainer.nativeElement,
    };
    const stage = new Konva.Stage(stageConfig);
    this.mapDrawingService.registerOn(stage);
    this.mapMarkerDrawingService.registerOn(stage);
  }
}
