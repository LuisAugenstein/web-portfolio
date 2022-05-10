import { Component, OnInit } from '@angular/core';
import { Adventure } from '@dnd-history/shared-interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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
    const newAdventureData: Adventure = {
      id: this.config.data.id,
      lastChangedAt: this.config.data.lastChangedAt,
      ...formData,
    };
    this.ref.close(newAdventureData);
  }
}
