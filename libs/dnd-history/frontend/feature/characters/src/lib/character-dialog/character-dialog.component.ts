import { Component, OnInit } from '@angular/core';
import { Character } from '@dnd-history/shared-interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'dnd-history-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss'],
})
export class CharacterDialogComponent implements OnInit {
  character!: Character;

  characterTypes = [
    'Player',
    'NPC'
  ];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.character = this.config.data;
  }

  submit(formData: Omit<Character, 'id'>) {
    const updatedCharacter: Character = {
      id: this.character.id,
      ...formData,
    };
    this.ref.close(updatedCharacter);
  }
}
