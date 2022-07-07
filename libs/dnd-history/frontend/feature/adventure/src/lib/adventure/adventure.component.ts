import { Component, OnDestroy, OnInit } from '@angular/core';
import { Adventure, Session } from '@dnd-history/shared-interfaces';
import { DialogService } from 'primeng/dynamicdialog';
import { AdventureDialogComponent } from '../adventure-dialog/adventure-dialog.component';
import { DatePipe } from '@angular/common';
import {
  AdventureService,
  AppState,
  selectSelectedSession,
} from '@dnd-history/frontend-state';
import { filter, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';

@Component({
  selector: 'dnd-history-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  providers: [DialogService],
})
export class AdventureComponent implements OnInit, OnDestroy {
  adventures$ = this.adventureService.entities$;
  private subscription?: Subscription;
  constructor(
    private readonly adventureService: AdventureService,
    private readonly store: Store<AppState>,
    private readonly dialogService: DialogService,
    public datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.subscription = this.store
      .select(selectSelectedSession)
      .pipe(filter((selectedSession) => selectedSession !== undefined))
      .subscribe((selectedSession) => {
        this.adventureService.clearCache();
        this.adventureService.getWithQuery({
          sessionId: (selectedSession as Session).id,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  createAdventureCard(): void {
    this.openAdventureCardDialog({
      id: nanoid(),
      title: '',
      content: '',
      createdAt: new Date(),
    })
      .pipe(map((adventure: Adventure) => this.adventureService.add(adventure)))
      .subscribe();
  }

  updateAdventureCard(adventure: Adventure): void {
    this.openAdventureCardDialog(adventure).subscribe(
      (updatedAdventure: Adventure) => {
        this.adventureService.update(updatedAdventure);
      }
    );
  }

  private openAdventureCardDialog(adventure: Adventure): Observable<Adventure> {
    const reference = this.dialogService.open(AdventureDialogComponent, {
      data: adventure,
    });
    return reference.onClose.pipe(
      filter((adventure?: Adventure) => adventure !== undefined)
    ) as Observable<Adventure>;
  }
}
