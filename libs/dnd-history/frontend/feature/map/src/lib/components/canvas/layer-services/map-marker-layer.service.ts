import { Injectable } from '@angular/core';
import {
  MapMarkerService,
  SelectedMapService,
} from '@dnd-history/frontend-services';
import { MapMarker } from '@dnd-history/shared-interfaces';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';

const MARKER_ICON_PATH = '/assets/icons/marker.svg';
const ICON_SIZE = 32;

@Injectable({ providedIn: 'root' })
export class MapMarkerLayerService {
  private layer!: Layer;
  private mapMarkers: MapMarker[] = [];

  constructor(
    selectedMapService: SelectedMapService,
    mapMarkerService: MapMarkerService
  ) {
    mapMarkerService.subscribe((mapMarkers) => {
      this.mapMarkers = mapMarkers;
      this.update();
    });
  }

  private update(): void {
    if (!this.layer) {
      return;
    }
    if(this.mapMarkers.length === 0){
      this.layer.destroyChildren();
      return;
    }
    const img = new Image();
    img.onload = () => {
      const mapMarkersImages = this.mapMarkers.map(
        (mapMarker) =>
          new Konva.Image({
            image: img,
            x: mapMarker.x,
            y: mapMarker.y,
            width: ICON_SIZE,
            height: ICON_SIZE,
          })
      );
      this.layer.destroyChildren();
      this.layer.add(...mapMarkersImages);
    };
    img.src = MARKER_ICON_PATH;
  }

  registerOn(stage: Stage): void {
    this.layer = new Konva.Layer();
    stage.add(this.layer);
    this.update();
  }
}
