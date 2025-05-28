import { Routes } from '@angular/router';
import { AuthorsComponent } from '@app/components/dashboard/authors/authors.component';
import { ReadersComponent } from '@app/components/dashboard/readers/readers.component';

export const contentRoutes: Routes = [
  {
    path: 'users',
    data: {
      title: 'Users',
      breadcrumb: 'Users',
    },
    loadChildren: () =>
      import('@app/components/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'dashboard',
    data: {
      title: 'Dashboard',
      breadcrumb: 'Dashboard',
    },
    component: AuthorsComponent,
    loadChildren: () =>
      import('@app/components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'dashboard/readers',
    data: {
      title: 'Dashboard',
      breadcrumb: 'Readers',
    },
    component: ReadersComponent,
  },
  {
    path: 'projects',
    data: {
      title: 'Projects',
      breadcrumb: 'Projects',
    },
    loadChildren: () =>
      import('@app/components/project/project.module').then(
        (m) => m.ProjectModule
      ),
  },
  {
    path: 'crowdagent',
    data: {
      title: 'CrowdAgent',
      breadcrumb: 'CrowdAgent',
    },
    loadChildren: () =>
      import('../../components/crowdagent/crowdagent.module').then(
        (m) => m.CrowdagentModule
      ),
  },
];
