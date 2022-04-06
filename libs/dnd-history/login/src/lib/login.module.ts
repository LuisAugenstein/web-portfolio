import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
  ],
  providers: [SessionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
