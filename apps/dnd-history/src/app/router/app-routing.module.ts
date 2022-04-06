import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdventureComponent } from '@web-portfolio/dnd-history/adventure';
import { CharactersComponent } from '@web-portfolio/dnd-history/characters';
import { HomeComponent } from '@web-portfolio/dnd-history/home';
import { LoginComponent } from '@web-portfolio/dnd-history/login';
import { MapComponent } from '@web-portfolio/dnd-history/map';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home/:session', component: HomeComponent },
  { path: 'adventure/:session', component: AdventureComponent},
  { path: 'characters/:session', component: CharactersComponent},
  { path: 'map/:session', component: MapComponent},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
