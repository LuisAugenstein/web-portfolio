import { Injectable } from '@angular/core';
import { UserPreferenceService } from '@dnd-history/frontend-services';
import { Map } from '@dnd-history/shared-interfaces';

@Injectable({ providedIn: 'root' })
export class CanvasMapService {
  context!: CanvasRenderingContext2D;
  canvas!: HTMLCanvasElement;
  map!: Map;

  constructor(readonly userPreferenceService: UserPreferenceService) {
    userPreferenceService.subscribe<Map>('selectedMap', (map: Map) => {
      this.map = map;
      this.update();
    });
  }

  setCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    this.context = context;
    this.canvas = canvas;
    this.update();
  }

  update(): void {
    if (!this.context || !this.map) {
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackgroundImage(this.map.src, this.canvas.width, this.canvas.height);
  }

  //=============================================
  //=========== Draw Individual stuff ===========
  //=============================================
  drawBackgroundImage(mapSrc: string, width: number, height: number): void {
    const img = new Image();
    img.onload = () => {
      this.context.drawImage(img, 0, 0, width, height);
    };
    img.src = mapSrc;
  }

  drawPinPoints() {
    //
  }

  drawPinConnections() {
    //
  }
}
