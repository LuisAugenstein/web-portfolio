import { Component, OnInit } from '@angular/core';
import { Adventure } from '@dnd-history/shared-interfaces';
import { DialogService } from 'primeng/dynamicdialog';
import { AdventureDialogComponent } from '../adventure-dialog/adventure-dialog.component';
import { AdventureService } from '../services/adventure.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'dnd-history-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  providers: [DialogService],
})
export class AdventureComponent implements OnInit {
  adventures: Adventure[] = [];

  constructor(
    private readonly adventureService: AdventureService,
    private readonly dialogService: DialogService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.adventureService.readAdventures().subscribe((adventures) => {
      this.adventures = adventures.sort((a,b) => a.id - b.id);
    });
  }

  async createAdventureCard() {
    this.adventureService
      .createAdventure({
        title: '',
        content: '',
      })
      .subscribe((newAdventure) => {
        this.adventures.push(newAdventure);
        this.showLargeCard(newAdventure);
      });
  }

  showLargeCard(selectedAdventure: Adventure) {
    const reference = this.dialogService.open(AdventureDialogComponent, {
      data: selectedAdventure,
    });
    reference.onClose.subscribe((updatedAdventure: Adventure) => {
      if (updatedAdventure) {
        this.adventureService
          .updateAdventure(updatedAdventure)
          .subscribe();
        this.adventures = this.adventures.map((adventure) => {
          return adventure.id === updatedAdventure.id
            ? updatedAdventure
            : adventure;
        });
      }
    });
  }
}
