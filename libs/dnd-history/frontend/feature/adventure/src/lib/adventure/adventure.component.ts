import { Component, OnInit } from '@angular/core';
import { Adventure } from '@dnd-history/shared-interfaces';
import { DialogService } from 'primeng/dynamicdialog';
import { AdventureDialogComponent } from '../adventure-dialog/adventure-dialog.component';
import { DatePipe } from '@angular/common';
import {
  AdventureService,
  SelectedSessionService,
} from '@dnd-history/frontend-services';

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
    const sessionId = this.selectedSessionService.getId() as number;
    this.adventureService.getAll(sessionId).subscribe((adventures) => {
      this.adventures = adventures;
    });
  }

  async createAdventureCard() {
    const sessionId = this.selectedSessionService.getId() as number;
    this.adventureService.create(sessionId).subscribe((newAdventure) => {
      this.showLargeCard(newAdventure);
    });
  }

  showLargeCard(selectedAdventure: Adventure) {
    const reference = this.dialogService.open(AdventureDialogComponent, {
      data: selectedAdventure,
    });
    reference.onClose.subscribe((updatedAdventure: Adventure | undefined) => {
      if (updatedAdventure) {
        // this.adventureService.update(updatedAdventure);
      }
    });
  }
}
