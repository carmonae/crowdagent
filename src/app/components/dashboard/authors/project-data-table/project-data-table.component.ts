import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserprojectI } from '@app/models/user-project';
import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
import { ProjectsTableService } from '@app/util/project-tables.util';
import { Observable } from 'rxjs';
import {
  SortEvent,
  SortableDirective,
} from 'src/app/shared/directive/sortable.directive';

@Component({
  selector: 'app-project-data-table',
  templateUrl: './project-data-table.component.html',
  styleUrls: ['./project-data-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    FeatherIconsComponent,
    SortableDirective,
  ],
})
export class ProjectDataTableComponent {
  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;
  @Input()
  set service(theService: ProjectsTableService) {
    this._service = theService;
    this.updateTable();
  }
  @Output('rowSelected') rowSelected = new EventEmitter<string>();

  private _service: ProjectsTableService = new ProjectsTableService([]);

  public isShow: boolean = false;
  public projects$: Observable<UserprojectI[]>;
  public total$: Observable<number>;

  public thispage: number = 1;
  public nextpage: number = this.thispage + 1;
  public pageafternext: number = this.nextpage + 1;
  public currentPage: number = 1;
  public lastpage: number = 1;
  public maxItems: number = 4;
  public nextItem: number = 0;

  constructor() {
    this.projects$ = this._service.projects$;
    this.total$ = this._service.total$;
  }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable(): void {
    this.projects$ = this._service.projects$;
    this.total$ = this._service.total$;
    this.currentPage = this._service.page;
    this.maxItems = this._service.pageSize;

    this.total$.subscribe((total) => {
      this.lastpage = Math.ceil(total / this.maxItems);
      console.log(
        'lastpage,currentpage,,maxItems',
        this.lastpage,
        this.currentPage,
        this.maxItems
      );

      if (this.lastpage != 0 && this.currentPage > this.lastpage) {
        this.currentPage = this.lastpage;
        this.gotoPage(this.currentPage);
      }
    });

    console.log('titles$', this.projects$);
  }
  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this._service.sortColumn = column;
    this._service.sortDirection = direction;
  }

  removeItem(id: string) {
    this.projects$.subscribe((data: UserprojectI[]) => {
      data.map((elem: UserprojectI, i: number) => {
        elem.projectUid == id && data.splice(i, 1);
      });
    });
  }

  getTitleImage(title: UserprojectI): string {
    if (title.coverurl && title.coverurl !== '') {
      return title.coverurl;
    } else {
      return 'assets/images/blankBookCover.jpg';
    }
  }

  onItemsPerPageChange(event: any) {
    this._service.pageSize = event.target.value;
    this.maxItems = this.service.pageSize;
    this.currentPage = 1;
    this._service.page = this.currentPage;
  }

  gotoPage(page: number): void {
    if (page > this.currentPage && page > this.pageafternext) {
      this.thispage += 1;
      this.nextpage = this.thispage + 1;
      this.pageafternext = this.nextpage + 1;
    } else if (page < this.currentPage && page < this.thispage) {
      this.thispage -= 1;
      this.nextpage = this.thispage + 1;
      this.pageafternext = this.nextpage + 1;
    }
    this.currentPage = page;
    this._service.page = this.currentPage;
    this.nextItem = (this.currentPage - 1) * this.maxItems;
  }

  onRowSelected(id: string) {
    console.log('row selected:', id);
    this.rowSelected.emit(id);
  }
}
