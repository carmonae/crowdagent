import { Component } from '@angular/core';
import * as Data from '../../../../shared/data/data/users/user-project'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  public projectData = Data.UserprojectData
}
