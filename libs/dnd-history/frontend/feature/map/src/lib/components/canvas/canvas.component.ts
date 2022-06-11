import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Konva from 'konva';
import { StageConfig } from 'konva/lib/Stage';
import { MapLayerService } from './layer-services/map-layer.service';
import { MapMarkerLayerService } from './layer-services/map-marker-layer.service';

@Component({
  selector: 'dnd-history-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class MainContentComponent implements AfterViewInit {
  @ViewChild('konvaContainer')
  konvaContainer!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly mapLayerService: MapLayerService,
    private readonly mapMarkerLayerService: MapMarkerLayerService
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
    this.mapLayerService.registerOn(stage);
    this.mapMarkerLayerService.registerOn(stage);
  }
}
