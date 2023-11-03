import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { sellingProduct } from '../../../../shared/data/data/default-dashboard/best-selling-product';
import { SortEvent, SortableDirective } from 'src/app/shared/directive/sortable.directive';
import { TablesService } from 'src/app/shared/services/tables/tables.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-best-selling-product',
  templateUrl: './best-selling-product.component.html',
  styleUrls: ['./best-selling-product.component.scss'],
  providers: [TablesService, DecimalPipe]
})
export class BestSellingProductComponent {

  public isShow: boolean = false;
  public selling$: Observable<sellingProduct[]>;
  public total$: Observable<number>;

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(public service: TablesService) {
    this.selling$ = service.selling$;
    this.total$ = service.total$;
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

  removeItem(id: number) {
    this.selling$.subscribe((data: sellingProduct[]) => {
      data.map((elem: sellingProduct, i: number) => { elem.id == id && data.splice(i, 1) })
    })
  }

  openMenu() {
    this.isShow = !this.isShow;
  }
}
