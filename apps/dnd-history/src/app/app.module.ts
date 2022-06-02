import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './router/app-routing.module';

import { LoginModule } from '@dnd-history/frontend-login';
import { HomeModule } from '@dnd-history/frontend-home';
import { AdventureModule } from '@dnd-history/frontend-adventure';
import { CharactersModule } from '@dnd-history/frontend-characters';
import { MapModule } from '@dnd-history/frontend-map';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    AdventureModule,
    CharactersModule,
    MapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}