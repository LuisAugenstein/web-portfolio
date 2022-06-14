import { Injectable } from '@angular/core';
import { Map, MapMarker } from '@dnd-history/shared-interfaces';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { Drawable } from '../map-drawing.service';

const MARKER_ICON_PATH = '/assets/icons/marker.svg';
const ICON_SIZE = 32;

@Injectable({ providedIn: 'root' })
export class MapMarkerDrawable implements Drawable {
  private layer!: Layer;

  private reset(): void {
    this.layer.destroyChildren();
  }

  update(map: Map | undefined): void {
    if (!map || map.mapMarkers.length === 0) {
      this.reset();
      return;
    }
    const img = new Image();
    img.onload = () => {
      const mapMarkersImages = map.mapMarkers.map(
        (mapMarker) =>
          new Konva.Image({
            image: img,
            x: mapMarker.x - ICON_SIZE / 2,
            y: mapMarker.y - ICON_SIZE,
            width: ICON_SIZE,
            height: ICON_SIZE,
            draggable: true
          })
      );
      this.reset();
      this.layer.add(...mapMarkersImages);
    };
    img.src = MARKER_ICON_PATH;
  }

  registerOn(stage: Stage): void {
    this.layer = new Konva.Layer();
    stage.add(this.layer);
  }
}
