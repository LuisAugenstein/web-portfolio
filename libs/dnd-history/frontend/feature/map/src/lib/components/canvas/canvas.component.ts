import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Konva from 'konva';
import { StageConfig } from 'konva/lib/Stage';
import { MenuItem } from 'primeng/api';
import { MapDrawingService } from './services/map-drawing.service';
import { MapMarkerDrawable } from './services/drawables/map-marker-drawing.service';
import {
  MapService,
  SelectedMapService,
  SelectedSessionService,
} from '@dnd-history/frontend-state';
import {
  combineLatest,
  forkJoin,
  mergeMap,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Maybe } from '@dnd-history/shared-interfaces';

interface ContextMenu {
  id: string;
  items: MenuItem[];
}

@Component({
  selector: 'dnd-history-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('konvaContainer')
  konvaContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('contextMenu')
  contextMenu!: any;

  private mapDrawingSubscription!: Subscription;

  contextMenuActive = false;

  constructor(
    private readonly mapDrawingService: MapDrawingService,
    private readonly selectedSessionService: SelectedSessionService,
    private readonly selectedMapService: SelectedMapService,
    private readonly mapService: MapService
  ) {}

  ngOnInit(): void {
    this.mapDrawingSubscription = this.createMapDrawingSubscription();
  }

  ngAfterViewInit(): void {
    this.mapDrawingService.setupAfterViewInit(
      this.konvaContainer.nativeElement
    );
  }

  ngOnDestroy(): void {
    this.mapDrawingSubscription.unsubscribe();
  }

  getContextMenuItems(): MenuItem[] {
    return [
      {
        label: 'new MapMarker',
        icon: 'i i-marker',
        command: () => {
          this.contextMenuActive = false;
          this.konvaContainer.nativeElement.addEventListener(
            'click',
            (event: MouseEvent) => {
              this.contextMenuActive = true;
              this.placeMapMarker(event.offsetX, event.offsetY);
            },
            {
              once: true,
            }
          );
        },
      },
    ];
  }

  private async placeMapMarker(x: number, y: number): Promise<void> {
    const selectedSessionId = this.selectedSessionService.value()?.id as number;
    const selectedMapId = this.selectedMapService.value()?.id as number;
    this.mapService.createMapMarker(selectedSessionId, selectedMapId, {
      x,
      y,
      title: '',
      description: '',
    });
  }

  private createMapDrawingSubscription(): Subscription {
    return combineLatest([
      this.selectedSessionService.get(),
      this.selectedMapService.get(),
    ])
      .pipe(
        switchMap(([selectedSession, selectedMap]) =>
          this.mapService.get(
            selectedSession?.id as number,
            selectedMap?.id as number
          )
        )
      )
      .subscribe((map) => {
        this.contextMenuActive = !!map;
        this.mapDrawingService.update(map);
      });
  }
}
