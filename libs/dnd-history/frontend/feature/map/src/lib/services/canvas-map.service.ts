import { Injectable } from '@angular/core';
import { Map } from '@dnd-history/shared-interfaces';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class CanvasMapService {
  context!: CanvasRenderingContext2D;
  canvas!: HTMLCanvasElement;
  map!: Map;

  constructor(readonly selectionService: SelectionService) {
    selectionService.map.subscribe((map: Map) => {
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
  }

  update(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackgroundImage(this.map.src);
  }

  //=============================================
  //=========== Draw Individual stuff ===========
  //=============================================
  drawBackgroundImage(mapSrc: string): void {
    const img = new Image();
    img.onload = () => {
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    };
    img.src = mapSrc;
  }

  drawPinPoints() {
    //
  }

  drawPinConnections(){
    //
  }
  

}
