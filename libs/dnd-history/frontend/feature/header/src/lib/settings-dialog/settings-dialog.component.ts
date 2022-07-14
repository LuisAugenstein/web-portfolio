import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'dnd-history-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {
  sessionName = '';
  sessionDeleted = false;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.sessionName = this.config.data.name;
    console.log(this.sessionName);
  }

  submit(formData: { title: string; content: string }) {
    // const newAdventure: Adventure = {
    //   id: this.config.data.id,
    //   createdAt: this.config.data.createdAt,
    //   ...formData,
    // };
    console.log(formData);
    this.ref.close(undefined);
  }

  deleteSession() {
    this.sessionDeleted = true;
  }
}
