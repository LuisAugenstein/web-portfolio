import { Injectable } from '@angular/core';

export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}

@Injectable({ providedIn: 'root' })
export class CanvasDrawingService {

  private context!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;

  private readonly drawables: Map<string, Drawable> = new Map();

  register(id: string, drawable: Drawable) {
    this.drawables.set(id, drawable);
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
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
    if (!this.context) {
      return;
    }
    console.log('draw')
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const [, drawable] of this.drawables) {
      drawable.draw(this.context);
    }
  }
}
