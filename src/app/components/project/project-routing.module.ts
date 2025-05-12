import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewProjectComponent } from './create-new-project/create-new-project.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'project-list',
        component: ProjectListComponent,
        data: {
          title: "Project List",
          breadcrumb: "Project List"
        }
      },
      {
        path: 'create-new',
        component: CreateNewProjectComponent,
        data: {
          title: "Project Create",
          breadcrumb: "Project Create"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
