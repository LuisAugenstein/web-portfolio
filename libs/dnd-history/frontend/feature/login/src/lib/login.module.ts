import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
