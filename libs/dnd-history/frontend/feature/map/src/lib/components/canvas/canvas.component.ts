import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MapDrawingService } from './services/map-drawing.service';
import { AppState, MapService, selectMap } from '@dnd-history/frontend-state';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Map } from '@dnd-history/shared-interfaces';
import { nanoid } from 'nanoid';

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

  private subscription?: Subscription;

  contextMenuActive = false;

  constructor(
    private readonly mapDrawingService: MapDrawingService,
    private readonly mapService: MapService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectMap)
      .subscribe((selectedMap) => {
        this.contextMenuActive = !!selectedMap;
      });
  }

  ngAfterViewInit(): void {
    this.mapDrawingService.init(this.konvaContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
              this.createMapMarker(event.offsetX, event.offsetY);
            },
            {
              once: true,
            }
          );
        },
      },
    ];
  }

  private createMapMarker(x: number, y: number): void {
    const selectedMap$ = this.store.select(selectMap).pipe(
      take(1),
      filter((selectedMap) => selectedMap !== undefined)
    ) as Observable<Map>;
    selectedMap$.subscribe(({ mapMarkers, ...selectedMap }) =>
      this.mapService.update({
        ...selectedMap,
        mapMarkers: [
          ...mapMarkers,
          {
            id: nanoid(),
            x,
            y,
            title: '',
            description: '',
          },
        ],
      })
    );
  }
}
