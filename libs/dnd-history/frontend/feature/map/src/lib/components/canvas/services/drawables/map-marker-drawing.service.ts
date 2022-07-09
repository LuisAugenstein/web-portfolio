import { Injectable } from '@angular/core';
import {
  AppState,
  MapService,
  selectMap,
  selectMapMarker,
  SELECT_MAPMARKER,
} from '@dnd-history/frontend-state';
import { Map, MapMarker as IMapMarker } from '@dnd-history/shared-interfaces';
import { Store } from '@ngrx/store';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { combineLatest, filter, Observable, Subscription } from 'rxjs';
import { Drawable } from '../map-drawing.service';
import { MapPreferencesService } from '../map-preferences.service';

const MARKER_ICON_PATH = '/assets/icons/marker.svg';
const ICON_SIZE = 32;

@Injectable({ providedIn: 'root' })
export class MapMarkerDrawable implements Drawable {
  private subscription?: Subscription;
  private mapMarkerInstances: MapMarkerInstance[] = [];
  constructor(
    private readonly store: Store<AppState>,
    private readonly mapService: MapService,
    private readonly mapPreferencesService: MapPreferencesService
  ) {}

  registerOn(stage: Stage): void {
    const layer = new Konva.Layer();
    stage.add(layer);
    this.subscription = combineLatest([
      this.store.select(selectMap),
      this.mapPreferencesService.showMapMarkers$,
    ]).subscribe(([selectedMap, showMapMarkers]) => {
      if (
        !selectedMap ||
        selectedMap.mapMarkers.length === 0 ||
        !showMapMarkers
      ) {
        layer.destroyChildren();
        return;
      }
      this.draw(layer, selectedMap.mapMarkers);
    });
  }

  destroy(): void {
    this.resetMapMarkers();
    this.subscription?.unsubscribe();
  }

  private resetMapMarkers(): void {
    this.mapMarkerInstances.forEach((m) => m.destroy());
    this.mapMarkerInstances = [];
  }

  private draw(layer: Konva.Layer, mapMarkers: IMapMarker[]): void {
    const img = new Image();
    img.onload = () => {
      const mapMarkersInstances = mapMarkers.map(
        (mapMarker) =>
          new MapMarkerInstance(this.store, this.mapService, img, mapMarker)
      );
      this.resetMapMarkers();
      this.mapMarkerInstances = mapMarkersInstances;
      layer.add(...mapMarkersInstances.map((m) => m.getKonvaImage()));
    };
    img.src = MARKER_ICON_PATH;
  }
}

class MapMarkerInstance {
  private konvaImage: Konva.Image;
  private subscription?: Subscription;
  private active = false;

  constructor(
    private store: Store<AppState>,
    private mapService: MapService,
    image: HTMLImageElement,
    mapMarker: IMapMarker
  ) {
    this.konvaImage = this.init(image, mapMarker);
  }

  getKonvaImage(): Konva.Image {
    return this.konvaImage;
  }

  init(image: HTMLImageElement, mapMarker: IMapMarker): Konva.Image {
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
    // make marker selectable on click
    this.subscription = this.store
      .select(selectMapMarker)
      .subscribe((selectedMapMarker) => {
        const setActive = (active: boolean) => {
          this.active = active;
          konvaImage.draggable(this.active);
          konvaImage.shadowEnabled(this.active);
          konvaImage.y(konvaImage.y() - (this.active ? 3 : -3));
        };
        if (selectedMapMarker?.id === mapMarker.id && !this.active) {
          setActive(true);
        } else if (selectedMapMarker?.id !== mapMarker.id && this.active) {
          setActive(false);
          this.mapService.updateMapMarker({
            ...mapMarker,
            x: konvaImage.x() + ICON_SIZE / 2,
            y: konvaImage.y() + ICON_SIZE,
          });
        }
      });
    konvaImage.on('click', () =>
      konvaImage.draggable()
        ? this.store.dispatch({ type: SELECT_MAPMARKER.type, id: undefined })
        : this.store.dispatch({ type: SELECT_MAPMARKER.type, id: mapMarker.id })
    );
    return konvaImage;
  }

  destroy(): void {
    this.konvaImage.destroy();
    this.subscription?.unsubscribe();
  }
}
