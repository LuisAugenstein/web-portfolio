import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, DynamicDialogModule, ButtonModule, InplaceModule, InputTextModule],
  declarations: [HeaderComponent, SettingsDialogComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
