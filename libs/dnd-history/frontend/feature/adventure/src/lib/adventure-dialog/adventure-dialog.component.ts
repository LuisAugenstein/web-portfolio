import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdventureData } from '../adventure/adventure.component';

@Component({
  selector: 'dnd-history-adventure-dialog',
  templateUrl: './adventure-dialog.component.html',
  styleUrls: ['./adventure-dialog.component.scss'],
})
export class AdventureDialogComponent implements OnInit {
  title = '';
  content = '';

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.title = this.config.data.title;
    this.content = this.config.data.content;
  }

  submit(formData: { title: string; content: string }) {
    const newAdventureData: AdventureData = {
      id: this.config.data.id,
      date: this.config.data.date,
      ...formData,
    };
    this.ref.close(newAdventureData);
  }
}
