import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './ragister/ragister.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path:'', component:LandingPageComponent},
    {path:'login', component:LoginComponent},
    {path:'ragister', component:RegisterComponent},
    {path:'dashboard', component:DashboardComponent},
    //redirect to home
    { path: '**', redirectTo:''}
];

export const appRoutingModule = RouterModule.forRoot(routes);