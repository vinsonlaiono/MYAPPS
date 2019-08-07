import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  { path: 'home' , component : HomeComponent },
  { path: 'login' , component : LoginComponent },
  { path: 'apps' , component : MainComponent, children: [
    { path: 'profile', component : ProfileComponent }, 
    { path: 'settings', component : SettingsComponent },
    { path: 'jobs', component : JobsComponent },
  ]},
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
