import { Component } from '@angular/core';
import { Adventure } from '@dnd-history/shared-interfaces';
import { DialogService } from 'primeng/dynamicdialog';
import { AdventureDialogComponent } from '../adventure-dialog/adventure-dialog.component';
import { DatePipe } from '@angular/common';
import { AdventureService } from '@dnd-history/frontend-services';


@Component({
  selector: 'dnd-history-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  providers: [DialogService],
})
export class AdventureComponent {
  constructor(
    private readonly adventureService: AdventureService,
    private readonly dialogService: DialogService,
    public datePipe: DatePipe
  ) {}

  getAdventures(): Adventure[] {
    return this.adventureService.getValue();
  }

  async createAdventureCard() {
    this.adventureService.create().subscribe((newAdventure) => {
      this.showLargeCard(newAdventure);
    });
  }

  showLargeCard(selectedAdventure: Adventure) {
    const reference = this.dialogService.open(AdventureDialogComponent, {
      data: selectedAdventure,
    });
    reference.onClose.subscribe((updatedAdventure: Adventure | undefined) => {
      if(updatedAdventure){
        this.adventureService.update(updatedAdventure).subscribe();
      }
    });
  }
}
