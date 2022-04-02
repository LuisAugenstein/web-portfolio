import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@web-portfolio/dnd-history/home';
import { LoginComponent } from '@web-portfolio/dnd-history/login';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home/:adventure', component: HomeComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
