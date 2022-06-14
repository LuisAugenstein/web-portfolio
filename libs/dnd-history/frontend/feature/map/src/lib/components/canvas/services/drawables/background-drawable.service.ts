import { Injectable } from '@angular/core';
import { Map } from '@dnd-history/shared-interfaces';
import Konva from 'konva';
import { Image as KonvaImage } from 'konva/lib/shapes/Image';
import { Stage } from 'konva/lib/Stage';
import { Drawable } from '../map-drawing.service';

@Injectable({ providedIn: 'root' })
export class BackgroundDrawable implements Drawable {
  private konvaImage!: KonvaImage;

  private reset(): void {
    this.konvaImage.image(new Image());
  }

  update(map: Map | undefined): void {
    if (!map) {
      this.reset();
      return;
    }
    const img = new Image();
    img.onload = () => {
      this.konvaImage.image(img);
    };
    img.src = map.src;
  }

  registerOn(stage: Stage): void {
    const layer = new Konva.Layer();
    this.konvaImage = new Konva.Image({
      x: 0,
      y: 0,
      width: stage.width(),
      height: stage.height(),
      image: new Image(),
    });
    layer.add(this.konvaImage);
    stage.add(layer);
  }
}
