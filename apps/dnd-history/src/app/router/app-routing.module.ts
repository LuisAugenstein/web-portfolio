import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@dnd-history/frontend-login';
import { HomeComponent } from '@dnd-history/frontend-home';
import { AdventureComponent } from '@dnd-history/frontend-adventure';
import { CharactersComponent } from '@dnd-history/frontend-characters';
import { MapComponent } from '@dnd-history/frontend-map';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'adventures', component: AdventureComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'maps', component: MapComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
