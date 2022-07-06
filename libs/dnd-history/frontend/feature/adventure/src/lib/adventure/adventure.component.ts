import { Component, OnInit } from '@angular/core';
import { Adventure } from '@dnd-history/shared-interfaces';
import { DialogService } from 'primeng/dynamicdialog';
import { AdventureDialogComponent } from '../adventure-dialog/adventure-dialog.component';
import { DatePipe } from '@angular/common';
import {
  ADVENTURE_ACTIONS,
  AppState,
} from '@dnd-history/frontend-state';
import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';

@Component({
  selector: 'dnd-history-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  providers: [DialogService],
})
export class AdventureComponent implements OnInit {
  adventures$ = this.store.select((state) => state.adventures);

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogService: DialogService,
    public datePipe: DatePipe
  ) {}
  ngOnInit(): void {}

  createAdventureCard(): void {
    this.openAdventureCardDialog({
      id: nanoid(),
      title: '',
      content: '',
      lastChangedAt: new Date(),
    })
      .pipe(
        map((adventure: Adventure) =>
          this.store.dispatch({
            type: ADVENTURE_ACTIONS.ADD.type,
            entity: adventure,
          })
        )
      )
      .subscribe();
  }

  updateAdventureCard(adventure: Adventure): void {
    this.openAdventureCardDialog(adventure).subscribe(
      (updatedAdventure: Adventure) => {
        this.store.dispatch({
          type: ADVENTURE_ACTIONS.UPDATE.type,
          entity: updatedAdventure,
        });
      }
    );
  }

  private openAdventureCardDialog(adventure: Adventure): Observable<Adventure> {
    const reference = this.dialogService.open(AdventureDialogComponent, {
      data: adventure,
    });
    return reference.onClose.pipe(
      filter(
        (selectedAdventureData?: Adventure) =>
          selectedAdventureData !== undefined
      )
    ) as Observable<Adventure>;
  }
}
