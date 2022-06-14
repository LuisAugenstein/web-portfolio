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
import { ContextMenu } from 'primeng/contextmenu';
import { ContextMenuService } from './services/context-menu.service';
import { MapDrawingService } from './services/map-drawing.service';
import { MapMarkerDrawable } from './services/drawables/map-marker-drawing.service';
import {
  MapService,
  SelectedMapService,
  SelectedSessionService,
} from '@dnd-history/frontend-services';
import {
  combineLatest,
  forkJoin,
  mergeMap,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';

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
    this.mapDrawingSubscription = combineLatest([
      this.selectedSessionService.id(),
      this.selectedMapService.id(),
    ])
      .pipe(
        switchMap(([selectedSessionId, selectedMapID]) =>
          this.mapService.get(selectedSessionId as number, selectedMapID)
        )
      )
      .subscribe((map) => {
        this.contextMenuActive = !!map;
        this.mapDrawingService.update(map);
      });
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
          const func = (event: MouseEvent) => {
            this.contextMenuActive = true;
            forkJoin([
              this.selectedSessionService.id().pipe(take(1)),
              this.selectedMapService.id().pipe(take(1)),
            ]).subscribe(([selectedSessionId, selectedMapID]) => {
              this.mapService.createMapMarker(
                selectedSessionId as number,
                selectedMapID as number,
                {
                  x: event.offsetX,
                  y: event.offsetY,
                  name: '',
                  description: '',
                }
              );
            });
          };
          this.konvaContainer.nativeElement.addEventListener('click', func, {
            once: true,
          });
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
      },
    ];
  }

  openContextMenu(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.contextMenu?.show(event);
  }
}
