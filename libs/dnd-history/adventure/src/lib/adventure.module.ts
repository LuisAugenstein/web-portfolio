import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdventureComponent } from './adventure/adventure.component';
import { HeaderModule } from '@web-portfolio/dnd-history/header';

import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

import { AdventureDialogComponent } from './adventure-dialog/adventure-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextareaModule,
    ButtonModule,
    HeaderModule,
    CardModule,
    DynamicDialogModule,
    InputTextModule,
  ],
  declarations: [AdventureComponent, AdventureDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdventureModule {}
