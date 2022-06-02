import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CanvasMapService } from '../services/canvas-map.service';

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

  constructor(private readonly canvasMapService: CanvasMapService) {}

  ngAfterViewInit(): void {
    this.canvasMapService.setCanvas(this.mapCanvas.nativeElement);
  }

  ngOnInit(): void {}
}
