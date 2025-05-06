import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ContentComponent } from './shared/component/layout/content/content.component';
import { content } from './shared/routes/routes';


import { LoginComponent } from '@app/components/login/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('@app/components/login/login.module').then(m => m.LoginComponentModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
