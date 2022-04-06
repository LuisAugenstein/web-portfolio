import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters/characters.component';
import { HeaderModule } from '@web-portfolio/dnd-history/header';

@NgModule({
  imports: [CommonModule, HeaderModule],
  declarations: [
    CharactersComponent
  ],
})
export class CharactersModule {}
