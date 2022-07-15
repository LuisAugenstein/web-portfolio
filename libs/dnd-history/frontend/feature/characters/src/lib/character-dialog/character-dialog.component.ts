import { Component, OnInit } from '@angular/core';
import { Character } from '@dnd-history/shared-interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'dnd-history-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss'],
})
export class CharacterDialogComponent implements OnInit {
  character: Character = {
    id: '',
    name: '',
    type: 'NPC',
    description: '',
  };
  playerName = '';

  characterTypes = ['Player', 'NPC'];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.character = { ...this.config.data };
    const playerRegex = /^Player \((.*)\)$/;
    const match = playerRegex.exec(this.character.type);
    if(match){
      this.character.type = 'Player';
      this.playerName = match[1];
    }
  }

  submit({
    playerName,
    ...character
  }: Omit<Character, 'id'> & { playerName: string }) {
    const updatedCharacter: Character = {
      ...character,
      id: this.character.id,
      type:
        character.type === 'Player' ? `Player (${playerName})` : character.type,
    };
    this.ref.close(updatedCharacter);
  }
}
