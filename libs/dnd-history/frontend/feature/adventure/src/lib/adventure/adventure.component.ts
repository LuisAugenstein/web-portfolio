import { Component, OnInit } from '@angular/core';
import { Adventure, AdventureDTO, Maybe } from '@dnd-history/shared-interfaces';
import { DialogService } from 'primeng/dynamicdialog';
import { AdventureDialogComponent } from '../adventure-dialog/adventure-dialog.component';
import { DatePipe } from '@angular/common';
import {
  AdventureService,
  SelectedSessionService,
} from '@dnd-history/frontend-state';
import { EMPTY, filter, from, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'dnd-history-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  providers: [DialogService],
})
export class AdventureComponent implements OnInit {
  adventures: Adventure[] = [];

  constructor(
    private readonly selectedSessionService: SelectedSessionService,
    private readonly adventureService: AdventureService,
    private readonly dialogService: DialogService,
    public datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    const sessionId = this.selectedSessionService.value()?.id as number;
    this.adventureService.getAll(sessionId).subscribe((adventures) => {
      this.adventures = adventures;
    });
  }

  createAdventureCard(): void {
    this.openAdventureCardDialog({
      title: '',
      content: '',
    })
      .pipe(
        switchMap((adventureDTO: AdventureDTO) => {
          return this.adventureService.create(
            this.selectedSessionService.value()?.id as number,
            adventureDTO
          );
        })
      )
      .subscribe();
  }

  updateAdventureCard({ id, ...curentAdventureDTO }: Adventure): void {
    this.openAdventureCardDialog(curentAdventureDTO).subscribe((updatedAdventureDTO: AdventureDTO) => {
      this.adventureService.update(id, updatedAdventureDTO);
    });
  }

  private openAdventureCardDialog(
    selectedAdventureDTO: AdventureDTO
  ): Observable<AdventureDTO> {
    const reference = this.dialogService.open(AdventureDialogComponent, {
      data: selectedAdventureDTO,
    });
    return reference.onClose.pipe(
      filter((adventureDTO?: AdventureDTO) => adventureDTO !== undefined)
    ) as Observable<AdventureDTO>;
  }
}
