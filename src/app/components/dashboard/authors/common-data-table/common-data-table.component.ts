import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { sellingProduct } from 'src/app/shared/data/data/default-dashboard/best-selling-product';
import { SortEvent, SortableDirective } from 'src/app/shared/directive/sortable.directive';
import { TablesService } from 'src/app/shared/services/tables/tables.service';

@Component({
  selector: 'app-common-data-table',
  templateUrl: './common-data-table.component.html',
  styleUrls: ['./common-data-table.component.scss']
})
export class CommonDataTableComponent {

  public isShow : boolean = false;
  public selling$ : Observable<sellingProduct[]>;
  public total$ : Observable<number>;

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(public service : TablesService) {
    this.selling$ = service.selling$;
    this.total$ = service.total$;
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

  removeItem(id: number){
    this.selling$.subscribe((data: sellingProduct[])=> {      
      data.map((elem: sellingProduct,i: number)=>{elem.id == id && data.splice(i,1)})
    })
  }
}
