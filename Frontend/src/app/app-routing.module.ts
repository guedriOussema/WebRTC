import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginPageComponent } from './pages/auth-pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/auth-pages/signup-page/signup-page.component';
import { MainLayoutAuthenticationComponent } from './pages/main-layout-authentication/main-layout-authentication.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {path: '', redirectTo:'auth/login', pathMatch: 'full'},

  {path:'auth', component:MainLayoutAuthenticationComponent,children:[
    {path:'login', component: LoginPageComponent},
    {path:'signup', component: SignupPageComponent}
  ]},

  {path: 'accueil', component: MainLayoutComponent, canActivate: [AuthGuard], children:[
    {path:'', component: AccueilComponent},
    {path:'user-details', component: UserDetailsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
