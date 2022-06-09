import { Injectable } from '@angular/core';
import { SelectedMapService } from '@dnd-history/frontend-services';
import Konva from 'konva';
import { Image as KonvaImage } from 'konva/lib/shapes/Image';
import { Stage } from 'konva/lib/Stage';

@Injectable({ providedIn: 'root' })
export class MapLayerService {
  private konvaImage!: KonvaImage;
  private mapSrc = '';

  constructor(selectedMapService: SelectedMapService) {
    selectedMapService.subscribe((selectedMap) => {
      this.mapSrc = selectedMap?.src || '';
      this.update();
    });
  }

  private update(): void {
    if(!this.konvaImage){
      return;
    }
    if (!this.mapSrc) {
      this.konvaImage.image(new Image());
      return;
    }
    const img = new Image();
    img.onload = () => {
      this.konvaImage.image(img);
    };
    img.src = this.mapSrc;
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
    this.update();
  }
}
