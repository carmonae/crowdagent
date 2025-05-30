import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PiqueI } from '@app/models/pique-model';
import { Usertitle } from '@app/models/user-titles';

import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';
import { PiquesService } from '@app/shared/services/piques.service';
import { TitlesService } from '@app/shared/services/titles.service';
import { getDatabase, ref, set } from 'firebase/database';
import { AuthService } from 'src/app/auth/service/auth.keycloak.service';
import { ProjectStatus } from 'src/app/models/projectStatus';
import { UserprojectI } from 'src/app/models/user-project';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TruncatePipe, FeatherIconsComponent, RouterLink],
})
export class ReviewListComponent implements OnInit {
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
  public projectListData: PiqueI[] = [];
  filterData: PiqueI[] = this.projectListData;
  private uid: string | undefined;

  constructor(
    private authService: AuthService,
    private projService: ProjectsService,
    private titleService: TitlesService,
    private piqueService: PiquesService,
    private router: Router
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit(): void {
    var _this = this;
    this.piqueService.getPiques(this.uid!).subscribe({
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
        ? this.projectListData.filter((data: PiqueI) => {
            return data.level == this.openTab ? true : false;
          })
        : this.projectListData;
  }

  editProject(data: UserprojectI) {
    console.log('edit project:', data);
    this.router.navigateByUrl('/projects/create-new', { state: data });
  }

  changeStatus(data: UserprojectI, choice: string) {
    //TODO: save change of project status
    //TODO: validate that we have title, abstract, and manuscript
    //data.status = choice as ProjectStatus;
    this.saveProject(data);
    this.filterTheData();

    if (
      //data.status != ProjectStatus.DRAFT &&
      choice != ProjectStatus.PUBLISHED
    ) {
      this.titleService.remove(data.projectUid!);
    }
  }

  saveProject(project: UserprojectI): void {
    // upload the manuscript and get the url as a reference, and save the project
    const projectRef = ref(
      this.db,
      `users/project/${this.uid}/${project.projectUid}`
    );
    set(projectRef, project);

    if (project.status == ProjectStatus.PUBLISHED) {
      const newTitle = new Usertitle(project, this.uid);
      console.log(project, newTitle);
      const titleRef = ref(this.db, `titles/${project.projectUid}`);
      set(titleRef, newTitle);
    }
  }
}
