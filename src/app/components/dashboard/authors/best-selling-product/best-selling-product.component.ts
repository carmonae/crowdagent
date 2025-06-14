import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { UserprojectI } from '@app/models/user-project';
import {
  SortEvent,
  SortableDirective,
} from '@app/shared/directive/sortable.directive';
import { ProjectsTableService } from '@app/util/project-tables.util';
import { Observable } from 'rxjs';
import { ProjectDataTableComponent } from '../project-data-table/project-data-table.component';

@Component({
  selector: 'app-best-selling-product',
  templateUrl: './best-selling-product.component.html',
  styleUrls: ['./best-selling-product.component.scss'],
  providers: [DecimalPipe],
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectDataTableComponent],
})
export class BestSellingProductComponent {
  @ViewChild('projectDataTable') projectDataTable!: ProjectDataTableComponent;
  private projectListData$: UserprojectI[] | null = [];
  @Input()
  set projectListData(projects: UserprojectI[] | null) {
    if (projects) {
      this.projectListData$ = projects;
      this.projectTableService.thedata = projects!.map((project) => project);
      this.projects$ = this.projectTableService.projects$;
      this.total$ = this.projectTableService.total$;
    }
  }
  @Output('bookSelected') bookSelected = new EventEmitter<string>();

  projectTableService = new ProjectsTableService(this.projectListData$!);

  private uid: string | undefined;

  public isShow: boolean = false;
  public filterSelection: string = 'All';
  public projects$: Observable<UserprojectI[]>;
  public total$: Observable<number>;

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private authService: AuthService) {
    this.projects$ = this.projectTableService.projects$;
    this.total$ = this.projectTableService.total$;
    this.uid = authService.getUid();
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.projectTableService.sortColumn = column;
    this.projectTableService.sortDirection = direction;
  }

  removeItem(id: string) {
    this.projects$.subscribe((data: UserprojectI[]) => {
      data.map((elem: UserprojectI, i: number) => {
        elem.projectUid == id && data.splice(i, 1);
      });
    });
  }

  showFilter() {
    this.isShow = !this.isShow;
  }

  filterBooks(filter: string) {
    this.isShow = !this.isShow;
    this.filterSelection = filter.toLocaleUpperCase();

    if (filter === 'all') {
      this.projectTableService.searchTerm = '';
    } else {
      this.projectTableService.searchTerm = filter;
    }
    console.log('filterBooks:', filter);
  }

  rowSelected(id: string) {
    console.log('row received:', id);
    this.bookSelected.emit(id);
  }
}
