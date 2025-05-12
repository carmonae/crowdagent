import { Component } from '@angular/core';
import * as Data from '../../../../shared/data/data/users/user-project'
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class ProjectsComponent {

  public projectData = Data.UserprojectData
}
