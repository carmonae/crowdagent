import { CommonModule, DecimalPipe } from '@angular/common';
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
import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
import { PiquedTitlesType } from '@app/shared/data/data/default-dashboard/piqued-titles-mock-data';
import { PiquedTitleTablesService } from '@app/util/piqued-tables.util';
import { Observable } from 'rxjs';
import {
  SortableDirective,
  SortEvent,
} from 'src/app/shared/directive/sortable.directive';

@Component({
  selector: 'app-pique-titles-data-table',
  templateUrl: './pique-titles-data-table.component.html',
  styleUrls: ['./pique-titles-data-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    FeatherIconsComponent,
    SortableDirective,
  ],
  providers: [DecimalPipe],
})
export class PiqueTitlesDataTableComponent {
  @Input() service: PiquedTitleTablesService = new PiquedTitleTablesService(
    new DecimalPipe('en'),
    []
  );
  @Input() tableName: string = '?';

  public titles$: Observable<PiquedTitlesType[]>;
  public total$: Observable<number>;

  public thispage: number = 1;
  public nextpage: number = this.thispage + 1;
  public pageafternext: number = this.nextpage + 1;
  public currentPage: number = 1;
  public lastpage: number = 1;
  public maxItems: number = 4;
  public nextItem: number = 0;

  @Output() itemMoved = new EventEmitter<string>();
  @Output() itemRemoved = new EventEmitter<string>();
  public isShow: boolean = false;

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private decimalPipe: DecimalPipe) {
    this.titles$ = this.service.titles$;
    this.total$ = this.service.total$;
    console.log('pique-titles-data-table.tableName', this.tableName);
  }

  ngOnInit(): void {
    this.titles$ = this.service.titles$;
    this.total$ = this.service.total$;
    this.currentPage = this.service.page;
    this.maxItems = this.service.pageSize;

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

    console.log('titles$', this.titles$);
    console.log('pique-titles-data-table.tableName$', this.tableName);
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  moveItem(id: string) {
    this.itemMoved.emit(id);
  }

  removeItem(id: string) {
    //this.titles$.map((elem: PiquedTitlesType,i: number)=>{elem.id == id && this.itemRemoved.emit(this.titles$[i])})
    this.itemRemoved.emit(id);
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
    this.service.page = this.currentPage;
    this.nextItem = (this.currentPage - 1) * this.maxItems;
  }

  onItemsPerPageChange(arg0: any) {
    this.service.pageSize = arg0.target.value;
    this.maxItems = this.service.pageSize;
    this.currentPage = 1;
    this.service.page = this.currentPage;
  }
}
