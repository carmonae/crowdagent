import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectStatus } from 'src/app/models/projectStatus';
import { UserprofileData } from 'src/app/models/user-profile';
//import * as Data from '../../../shared/data/data/project/project-list'
import { UserprojectI, UserprojectMockData as Data } from 'src/app/models/user-project';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  active = 1
  public openTab: string = "All";

  lifeCycle = {
    Created: ['Published', 'Archived'],
    Published: ['Parked', 'Archived'],
    Parked: ['Published', 'Archived'],
    Archived: []
  }

  // Data
  public projectListData: UserprojectI[] = [];
  filterData: UserprojectI[] = this.projectListData
  private uid: string | undefined

  constructor(
    private authService: AuthService,
    private projService: ProjectsService,
    private router: Router) {
    this.uid = authService.getUid()
  }

  ngOnInit(): void {
    var _this = this
    this.projService.getProjects(this.uid)
      .subscribe({
        next(projects) {
          console.log('got projects:', projects)
          _this.projectListData = _this.filterData = projects
        },
        error(msg) {
          console.log(msg)
        },
        complete() {
          console.log('getProjects finished')
        }
      });

    console.log(this.lifeCycle)
  }

  //Filter data
  tabbed(val: string) {
    this.openTab = val;
    this.filterTheData();
  }

  filterTheData(): void {

    this.filterData = this.openTab !== 'All' ? this.projectListData.filter((data: UserprojectI) => {
      return data.status == this.openTab ? true : false
    }) : this.projectListData

  }

  editProject(data: UserprojectI) {
    console.log('edit project:', data)
    this.router.navigateByUrl('/projects/create-new', { state: data })
  }

  changeStatus(data: UserprojectI, choice: string) {
    //TODO: save change of project status
    //TODO: validate that we have title, abstract, and manuscript
    data.status = choice as ProjectStatus

    this.filterTheData()
  }
}


