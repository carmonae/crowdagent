import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './agents/agents.component';
import { AuthorsComponent } from './authors/authors.component';
import { DashboardDefaultComponent } from './default/default.component';
import { ReadersComponent } from './readers/readers.component';

const routes: Routes = [
  {
    path: 'dashboard',
    data: {
      title: 'Dashboard',
      breadcrumb: 'Dashboard',
    },
    children: [
      {
        path: 'default',
        component: DashboardDefaultComponent,
        data: {
          title: 'General Dashboard',
          breadcrumb: 'General',
        },
      },
      {
        path: 'authors',
        component: AuthorsComponent,
        data: {
          title: "Author's Dashboard",
          breadcrumb: 'Authors',
        },
      },
      {
        path: 'readers',
        component: ReadersComponent,
        data: {
          title: "Reader's Dashboard",
          breadcrumb: 'Readers',
        },
      },
      {
        path: 'agents',
        component: AgentsComponent,
        data: {
          title: "Agent's Dashboard",
          breadcrumb: 'Agents',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
