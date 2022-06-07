import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CanvasDrawingService } from '../services/canvas-drawing.service';

@Component({
  selector: 'dnd-history-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit, AfterViewInit {
  @ViewChild('mapCanvas')
  mapCanvas!: ElementRef<HTMLCanvasElement>;
  selectedTool!: any;

  tools = [
    {
      name: 'create marker',
    },
    {
      name: 'move marker',
    },
    {
      name: 'connect marker',
    },
  ];

  constructor(private readonly canvasDrawingService: CanvasDrawingService) {}

  ngAfterViewInit(): void {
    this.canvasDrawingService.setCanvas(this.mapCanvas.nativeElement);
  }

  ngOnInit(): void {}
}
