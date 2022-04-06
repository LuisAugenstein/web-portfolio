import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdventureComponent } from './adventure/adventure.component';
import { HeaderModule } from '@web-portfolio/dnd-history/header';

@NgModule({
  imports: [CommonModule, HeaderModule],
  declarations: [
    AdventureComponent
  ],
})
export class AdventureModule {}
