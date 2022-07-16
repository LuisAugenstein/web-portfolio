import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdventureComponent } from './adventure/adventure.component';
import { HeaderModule } from '@dnd-history/frontend-header';

import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

import { AdventureDialogComponent } from './adventure-dialog/adventure-dialog.component';
import { AdventureCardComponent } from './adventure-card/adventure-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputTextareaModule,
    ButtonModule,
    HeaderModule,
    CardModule,
    DynamicDialogModule,
    InputTextModule,
  ],
  declarations: [AdventureComponent, AdventureDialogComponent, AdventureCardComponent],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdventureModule {}
