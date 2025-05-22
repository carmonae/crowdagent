import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { FullComponent } from './shared/component/layout/full/full.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { ContentGuard } from './shared/guard/content.guard';

import { LoginComponent } from './components/login/login/login.component';
import { contentRoutes } from './shared/routes/contentRoutes';
import { fullRoutes } from './shared/routes/full-routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
    data: { role: 'anyone' },
    loadChildren: () =>
      import('@app/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'login',
    data: {
      title: 'Login',
      breadcrumb: 'Login',
      role: 'anyone',
    },
    component: LoginComponent,
    loadChildren: () =>
      import('@app/components/login/login.module').then(
        (m) => m.LoginComponentModule
      ),
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [ContentGuard],
    children: contentRoutes,
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AdminGuard],
    children: fullRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
