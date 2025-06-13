import { Routes } from '@angular/router';
import { AuthorsComponent } from '@app/components/dashboard/authors/authors.component';
import { DashboardDefaultComponent } from '@app/components/dashboard/default/default.component';
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
      title: "Author's Dashboard",
      breadcrumb: 'Authors',
    },
    component: AuthorsComponent,
    loadChildren: () =>
      import('@app/components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'dashboard/default',
    data: {
      title: 'Dashboard',
      breadcrumb: 'General',
    },
    component: DashboardDefaultComponent,
  },
  {
    path: 'dashboard/authors',
    data: {
      title: 'Dashboard',
      breadcrumb: 'Authors',
    },
    component: AuthorsComponent,
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
