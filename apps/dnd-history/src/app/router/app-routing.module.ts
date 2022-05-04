import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@web-portfolio/dnd-history-feature-home';
import { LoginComponent } from '@web-portfolio/dnd-history-feature-login';
import { AdventureComponent } from '@web-portfolio/dnd-history-feature-adventure';
import { CharactersComponent } from '@web-portfolio/dnd-history-feature-characters';
import { MapComponent } from '@web-portfolio/dnd-history-feature-map';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'adventure', component: AdventureComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'map', component: MapComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
