import { Injectable } from '@angular/core';
import {
  PinPointService,
  SelectedMapService,
} from '@dnd-history/frontend-services';
import { PinPoint } from '@dnd-history/shared-interfaces';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';

const MARKER_ICON_PATH = '/assets/icons/marker.svg';
const ICON_SIZE = 32;

@Injectable({ providedIn: 'root' })
export class PinPointLayerService {
  private layer!: Layer;
  private pinPoints: PinPoint[] = [];

  constructor(
    selectedMapService: SelectedMapService,
    pinPointService: PinPointService
  ) {
    pinPointService.subscribe((pinPoints) => {
      this.pinPoints = pinPoints;
      this.update();
    });
  }

  private update(): void {
    if (!this.layer || this.pinPoints.length === 0) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      const pinPointsImages = this.pinPoints.map(
        (pinPoint) =>
          new Konva.Image({
            image: img,
            x: pinPoint.x,
            y: pinPoint.y,
            width: ICON_SIZE,
            height: ICON_SIZE,
          })
      );
      this.layer.destroyChildren();
      this.layer.add(...pinPointsImages);
    };
    img.src = MARKER_ICON_PATH;
  }

  registerOn(stage: Stage): void {
    this.layer = new Konva.Layer();
    stage.add(this.layer);
    this.update();
  }
}
