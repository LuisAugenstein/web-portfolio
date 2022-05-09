import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AdventureDialogComponent } from '../adventure-dialog/adventure-dialog.component';

export interface AdventureData {
  id: string;
  date: string;
  title: string;
  content: string;
}

@Component({
  selector: 'dnd-history-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  providers: [DialogService],
})
export class AdventureComponent implements OnInit {
  adventureData: AdventureData[] = [];

  constructor(private dialogService: DialogService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    //todo: load adventure data from backend
  }

  createAdventureCard() {
    const newAdventureData: AdventureData = {
      id: `${this.adventureData.length + 1}`,
      date: '15/10/2020 10:30',
      title: '',
      content: '',
    };
    this.adventureData.push(newAdventureData);
    // TODO: post new adventurecard to server
    this.showLargeCard(newAdventureData);
  }

  showLargeCard(selectedAdventureData: AdventureData) {
    const reference = this.dialogService.open(AdventureDialogComponent, {
      data: selectedAdventureData,
    });
    reference.onClose.subscribe((newDataEntry: AdventureData) => {
      if (newDataEntry) {
        // TODO: this.adventureDataService.updateEntry(newDataEntry)
        this.adventureData = this.adventureData.map((dataEntry) => {
          if (dataEntry.id === newDataEntry.id) {
            return newDataEntry;
          }
          return dataEntry;
        });
      }
    });
  }
}
