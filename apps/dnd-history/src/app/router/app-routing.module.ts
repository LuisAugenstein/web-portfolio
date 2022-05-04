import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@web-portfolio/dnd-history-home';
import { LoginComponent } from '@web-portfolio/dnd-history-login';
import { AdventureComponent } from '@web-portfolio/dnd-history-adventure';
import { CharactersComponent } from '@web-portfolio/dnd-history-characters';
import { MapComponent } from '@web-portfolio/dnd-history-map';

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
