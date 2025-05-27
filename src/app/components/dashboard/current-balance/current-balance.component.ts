import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { UserprojectI } from '@app/models/user-project';
import { ProjectsService } from '@app/shared/services/projects.service';
@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.scss'],
  standalone: true,
  imports: [RouterLink, DecimalPipe],
})
export class CurrentBalanceComponent {
  public totalPiques: number = 0;
  public piquesThisWeek: number = 0;
  public nBooks: number = 0;
  public averagePiques: number = 0;
  public maxPiques: number = 0;

  public uid: string | undefined;
  public projectListData: UserprojectI[] = [];

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit(): void {
    var _this = this;
    this.projectsService.getProjects(this.uid).subscribe({
      next(projects) {
        _this.projectListData = projects;
        _this.getChartData();
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('getProjects finished');
      },
    });
  }

  getChartData(): void {
    console.log('getChartData:', this.projectListData);
    this.totalPiques = this.projectListData
      .filter((proj) => proj.scoreM)
      .reduce((sum, current) => sum + current.scoreM, 0);

    this.nBooks = this.projectListData.map((proj) => proj.projectUid).length;
    this.averagePiques = this.totalPiques / this.nBooks;
    this.maxPiques = Math.max(
      ...this.projectListData.map((proj) => proj.scoreM)
    );
  }
}
