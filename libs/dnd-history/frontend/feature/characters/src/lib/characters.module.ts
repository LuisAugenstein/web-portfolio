import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters/characters.component';
import { HeaderModule } from '@dnd-history/frontend-header';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CharacterDialogComponent } from './character-dialog/character-dialog.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    TableModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
  ],
  declarations: [CharactersComponent, CharacterDialogComponent],
  providers: [DialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CharactersModule {}
