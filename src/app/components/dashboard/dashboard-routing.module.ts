import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './agents/agents.component';
import { AuthorsComponent } from './authors/authors.component';
import { ReadersComponent } from './readers/readers.component';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: 'default',
        component: AuthorsComponent,
        data: {
          title: 'Authors Dashboard',
          breadcrumb: 'Authors'
        }
      },
      {
        path: 'authors',
        component: AuthorsComponent,
        data: {
          title: 'Authors Dashboard',
          breadcrumb: 'Authors'
        }
      },
      {
        path: 'readers',
        component: ReadersComponent,
        data: {
          title: 'Readers Dashboard',
          breadcrumb: 'Readers'
        }
      },
      {
        path: 'agents',
        component: AgentsComponent,
        data: {
          title: 'Agents Dashboard',
          breadcrumb: 'Agents'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
