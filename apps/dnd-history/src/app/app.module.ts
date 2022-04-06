import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './router/app-routing.module';
import { LoginModule } from '@web-portfolio/dnd-history/login';
import { HomeModule } from '@web-portfolio/dnd-history/home';
import { AppComponent } from './app.component';
import { AdventureModule } from '@web-portfolio/dnd-history/adventure';
import { CharactersModule } from '@web-portfolio/dnd-history/characters';
import { MapModule } from '@web-portfolio/dnd-history/map';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LoginModule, HomeModule, AdventureModule, CharactersModule, MapModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
