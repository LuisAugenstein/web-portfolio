import { Injectable } from '@angular/core';
import {
  MapService,
} from '@dnd-history/frontend-state';
import { Map, MapMarker } from '@dnd-history/shared-interfaces';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Image as KonvaImage } from 'konva/lib/shapes/Image';
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

  constructor(
    private readonly mapService: MapService,
  ) {}
  
  destroy(): void {
    throw new Error('Method not implemented.');
  }

  update(map: Map | undefined): void {
    if (!map || map.mapMarkers.length === 0) {
      this.reset();
      return;
    }
    const img = new Image();
    img.onload = () => {
      const mapMarkersImages = map.mapMarkers.map((mapMarker) =>
        this.createKonvaImage(img, mapMarker)
      );
      this.reset();
      this.layer.add(...mapMarkersImages);
    };
    img.src = MARKER_ICON_PATH;
  }

  private createKonvaImage(
    image: HTMLImageElement,
    mapMarker: MapMarker
  ): KonvaImage {
    // create konvaImage
    const konvaImage = new Konva.Image({
      image,
      x: mapMarker.x - ICON_SIZE / 2,
      y: mapMarker.y - ICON_SIZE,
      width: ICON_SIZE,
      height: ICON_SIZE,
      shadowEnabled: false,
      shadowColor: 'green',
      shadowBlur: 5,
    });
    // use mouse pointer on hover
    konvaImage.on('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });
    konvaImage.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });
    // make marker draggable on click
    const setActive = (active: boolean) => {
      konvaImage.draggable(active);
      konvaImage.shadowEnabled(active);
      konvaImage.y(konvaImage.y() - (active ? 3 : -3));
      // active
      //   ? this.selectedMapMarkerService.next({ id: mapMarker.id })
      //   : this.selectedMapMarkerService.reset();
    };
    konvaImage.on('click', () => {
      if (!konvaImage.draggable()) {
        setActive(true);
      } else {
        setActive(false);
        mapMarker.x = konvaImage.x() + ICON_SIZE / 2;
        mapMarker.y = konvaImage.y() + ICON_SIZE;
        // this.mapService
        //   .updateMapMarker(mapMarker.id, {
        //     x: mapMarker.x,
        //     y: mapMarker.y,
        //   })
        //   .subscribe();
      }
    });

    return konvaImage;
  }

  registerOn(stage: Stage): void {
    this.layer = new Konva.Layer();
    stage.add(this.layer);
  }
}
