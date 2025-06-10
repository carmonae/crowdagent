import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usertitle } from '@app/models/user-titles';

import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';
import { TitlesService } from '@app/shared/services/titles.service';
import { getDatabase, ref, set } from 'firebase/database';
import { AuthService } from 'src/app/auth/service/auth.keycloak.service';
import { ProjectStatus } from 'src/app/models/projectStatus';
import { UserprojectI } from 'src/app/models/user-project';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TruncatePipe, FeatherIconsComponent, RouterLink],
})
export class ProjectListComponent implements OnInit {
  active = 1;
  public openTab: string = 'All';

  lifeCycle = {
    Draft: ['Published', 'Archived'],
    Published: ['Parked', 'Archived'],
    Parked: ['Published', 'Archived'],
    Archived: [],
  };

  private db = getDatabase();

  // Data
  public projectListData: UserprojectI[] = [];
  filterData: UserprojectI[] = this.projectListData;
  private uid: string | undefined;

  constructor(
    private authService: AuthService,
    private projService: ProjectsService,
    private titleService: TitlesService,
    private router: Router
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit(): void {
    var _this = this;
    this.projService.getProjects(this.uid).subscribe({
      next(projects) {
        console.log('got projects:', projects);
        _this.projectListData = _this.filterData = projects;
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('getProjects finished');
      },
    });

    console.log(this.lifeCycle);
  }

  //Filter data
  tabbed(val: string) {
    this.openTab = val;
    this.filterTheData();
  }

  filterTheData(): void {
    this.filterData =
      this.openTab !== 'All'
        ? this.projectListData.filter((data: UserprojectI) => {
            return data.status == this.openTab ? true : false;
          })
        : this.projectListData;
  }

  progress(data: any) {
    return Math.min((data.countM / 100) * 100, 100).toString() + '%';
  }

  editProject(data: UserprojectI) {
    console.log('edit project:', data);
    this.router.navigateByUrl('/projects/create-new', { state: data });
  }

  changeStatus(data: UserprojectI, choice: string) {
    //TODO: save change of project status
    //TODO: validate that we have title, abstract, and manuscript
    data.status = choice as ProjectStatus;
    this.saveProject(data);
    this.filterTheData();

    if (
      data.status != ProjectStatus.DRAFT &&
      choice != ProjectStatus.PUBLISHED
    ) {
      this.titleService.remove(data.projectUid!);
    }

    if (data.status === ProjectStatus.PUBLISHED) {
      this.projService.setPublishingDate(this.uid!, data.projectUid!);

      // Let's add the title to allow people to pique it
      const newTitle = new Usertitle(data, this.uid);
      console.log(data, newTitle);
      const titleRef = ref(this.db, `titles/${data.projectUid}`);
      set(titleRef, newTitle);
    }
  }

  saveProject(project: UserprojectI): void {
    // upload the manuscript and get the url as a reference, and save the project
    const projectRef = ref(
      this.db,
      `users/project/${this.uid}/${project.projectUid}`
    );
    set(projectRef, project);
  }
}
