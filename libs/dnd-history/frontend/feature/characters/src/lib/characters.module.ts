import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters/characters.component';
import { HeaderModule } from '@dnd-history/frontend-header';

@NgModule({
  imports: [CommonModule, HeaderModule],
  declarations: [CharactersComponent],
})
export class CharactersModule {}
