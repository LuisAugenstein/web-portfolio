import { Injectable } from '@angular/core';
import { AppState, selectMap } from '@dnd-history/frontend-state';
import { Map } from '@dnd-history/shared-interfaces';
import { Store } from '@ngrx/store';
import Konva from 'konva';
import { Image as KonvaImage } from 'konva/lib/shapes/Image';
import { Stage } from 'konva/lib/Stage';
import { Subscription, tap } from 'rxjs';
import { Drawable } from '../map-drawing.service';

@Injectable({ providedIn: 'root' })
export class BackgroundDrawable implements Drawable {
  private subscription?: Subscription;

  constructor(private readonly store: Store<AppState>) {}

  registerOn(stage: Stage): void {
    const layer = new Konva.Layer();
    const background = new Konva.Image({
      x: 0,
      y: 0,
      width: stage.width(),
      height: stage.height(),
      image: new Image(),
    });
    layer.add(background);
    stage.add(layer);
    this.subscription = this.store
      .select(selectMap)
      .subscribe((selectedMap) => this.draw(background, selectedMap));
  }

  destroy(): void {
    this.subscription?.unsubscribe();
  }

  private draw(background: KonvaImage, map?: Map): void {
    if (!map) {
      background.image(new Image());
      return;
    }
    const img = new Image();
    img.onload = () => {
      background.image(img);
    };
    img.src = map.src;
  }
}
