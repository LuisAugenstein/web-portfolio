import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Stage, StageConfig } from 'konva/lib/Stage';
import { BackgroundDrawable } from './drawables/background-drawable.service';
import { MapMarkerDrawable } from './drawables/map-marker-drawing.service';

export interface Drawable {
  registerOn(stage: Stage): void;
  destroy(): void;
}

@Injectable({ providedIn: 'root' })
export class MapDrawingService {
  drawables: Drawable[] = [];

  constructor(
    private readonly backgroundDrawable: BackgroundDrawable,
    private readonly mapMarkerDrawable: MapMarkerDrawable,
  ) {}

  init(containerElement: HTMLDivElement) {
    const parentElement = containerElement.parentElement as HTMLElement;
    const stageConfig: StageConfig = {
      width: parentElement.offsetWidth,
      height: parentElement.offsetHeight,
      container: containerElement,
    };
    const stage = new Konva.Stage(stageConfig);

    this.drawables = [this.backgroundDrawable, this.mapMarkerDrawable];
    //this.drawables.push(this.mapmarkerConnectionDrawable);
    this.drawables.forEach((d) => d.registerOn(stage));
  }

  destroy(): void{
    this.drawables.forEach(d => d.destroy());
  }
}
