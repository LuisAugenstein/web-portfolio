import { Injectable } from '@angular/core';
import {
  AppState,
  MapService,
  selectMap,
  SELECT_MAPMARKER,
} from '@dnd-history/frontend-state';
import { Map, MapMarker } from '@dnd-history/shared-interfaces';
import { Store } from '@ngrx/store';
import Konva from 'konva';
import { Image as KonvaImage } from 'konva/lib/shapes/Image';
import { Stage } from 'konva/lib/Stage';
import { Subscription } from 'rxjs';
import { Drawable } from '../map-drawing.service';

const MARKER_ICON_PATH = '/assets/icons/marker.svg';
const ICON_SIZE = 32;

@Injectable({ providedIn: 'root' })
export class MapMarkerDrawable implements Drawable {
  private subscription?: Subscription;
  constructor(
    private readonly store: Store<AppState>,
    private readonly mapService: MapService
  ) {}

  registerOn(stage: Stage): void {
    const layer = new Konva.Layer();
    stage.add(layer);
    this.subscription = this.store
      .select(selectMap)
      .subscribe((selectedMap) => this.draw(layer, selectedMap));
  }

  destroy(): void {
    this.subscription?.unsubscribe();
  }

  private draw(layer: Konva.Layer, selectedMap?: Map): void {
    if (!selectedMap || selectedMap.mapMarkers.length === 0) {
      layer.destroyChildren();
      return;
    }
    const img = new Image();
    img.onload = () => {
      const mapMarkersImages = selectedMap.mapMarkers.map((mapMarker) =>
        this.createKonvaImage(img, mapMarker)
      );
      layer.destroyChildren();
      layer.add(...mapMarkersImages);
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
      active
        ? this.store.dispatch({ type: SELECT_MAPMARKER.type, id: mapMarker.id })
        : this.store.dispatch({ type: SELECT_MAPMARKER.type, id: undefined });
    };
    konvaImage.on('click', () => {
      if (!konvaImage.draggable()) {
        setActive(true);
      } else {
        setActive(false);
        this.mapService.updateMapMarker({
          ...mapMarker,
          x: konvaImage.x() + ICON_SIZE / 2,
          y: konvaImage.y() + ICON_SIZE,
        });
      }
    });

    return konvaImage;
  }
}
