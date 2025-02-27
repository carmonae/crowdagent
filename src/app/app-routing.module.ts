import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { content } from './shared/routes/routes';
import { LoginComponent } from './auth/firebase/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: content
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/firebase/login.module').then(m => m.LoginComponentModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { roles: ["admin"] }
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
    data: { roles: ["authors", "readers"] }
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
