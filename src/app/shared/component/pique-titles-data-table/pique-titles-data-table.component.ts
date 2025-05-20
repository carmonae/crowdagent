import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
import { PiquedTitlesType } from '@app/shared/data/data/default-dashboard/piqued-titles-mock-data';
import { PiquedTitleTablesService } from '@app/util/piqued-tables.util';
import { Observable } from 'rxjs';
import { SortEvent, SortableDirective } from 'src/app/shared/directive/sortable.directive';



@Component({
  selector: 'app-pique-titles-data-table',
  templateUrl: './pique-titles-data-table.component.html',
  styleUrls: ['./pique-titles-data-table.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FeatherIconsComponent, SortableDirective],
  providers: [DecimalPipe]
})
export class PiqueTitlesDataTableComponent {

  @Input() service: PiquedTitleTablesService = new PiquedTitleTablesService(new DecimalPipe('en'),[]);
  @Input() tableName: string = '?';

  public titles$: Observable<PiquedTitlesType[]>;
  public total$: Observable<number>;

  @Output() itemMoved = new EventEmitter<number>();
  @Output() itemRemoved = new EventEmitter<number>();
  public isShow : boolean = false;

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private decimalPipe: DecimalPipe) {
      this.titles$ = this.service.titles$;
      this.total$ = this.service.total$;
      console.log('pique-titles-data-table.tableName', this.tableName);
  }

  ngOnInit(): void {
    this.titles$ = this.service.titles$;
    this.total$ = this.service.total$;
    console.log('titles$', this.titles$);
    console.log('pique-titles-data-table.tableName$', this.tableName);
  }

  onSort({ column, direction }: SortEvent){
    this.headers.forEach((header) => {
      if(header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  moveItem(id: number){
    this.itemMoved.emit(id);
  }

  removeItem(id: number){    
    //this.titles$.map((elem: PiquedTitlesType,i: number)=>{elem.id == id && this.itemRemoved.emit(this.titles$[i])})
    this.itemRemoved.emit(id);
  }
}

