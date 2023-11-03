import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, of, pipe, switchMap, tap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { SortColumn, SortDirection } from '../../directive/sortable.directive';
import { BestSellingProduct, sellingProduct } from '../../data/data/default-dashboard/best-selling-product';

interface SearchResult {
	selling: sellingProduct[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(selling: sellingProduct[], column: SortColumn, direction: string): sellingProduct[] {
	if (direction === '' || column === '') {
		return selling;
	} else {
		return [...selling].sort((a : any, b : any) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(sellingData: sellingProduct, term: string, pipe: PipeTransform) {
	return (
		sellingData.product.toLowerCase().includes(term.toLowerCase()) ||
    sellingData.category.toLowerCase().includes(term.toLowerCase()) ||
    sellingData.brand.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(sellingData.price).includes(term) ||
    pipe.transform(sellingData.stock).includes(term) ||
    pipe.transform(sellingData.order).includes(term) ||
    pipe.transform(sellingData.sales).includes(term)
	);
}

@Injectable({
  providedIn: 'root'
})

export class TablesService {

    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _selling$ = new BehaviorSubject<sellingProduct[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
  
    private _state: State = {
      page: 1,
      pageSize: 4,
      searchTerm: '',
      sortColumn: '',
      sortDirection: '',
    };

    constructor(private pipe: DecimalPipe) {
      this._search$
        .pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false)),
        )
        .subscribe((result) => {
          this._selling$.next(result.selling);
          this._total$.next(result.total);
        });
  
      this._search$.next();
    }
  
    get selling$() {
      return this._selling$.asObservable();
    }
    get total$() {
      return this._total$.asObservable();
    }
    get loading$() {
      return this._loading$.asObservable();
    }
    get page() {
      return this._state.page;
    }
    get pageSize() {
      return this._state.pageSize;
    }
    get searchTerm() {
      return this._state.searchTerm;
    }
  
    set page(page: number) {
      this._set({ page });
    }
    set pageSize(pageSize: number) {
      this._set({ pageSize });
    }
    set searchTerm(searchTerm: string) {
      this._set({ searchTerm });
    }
    set sortColumn(sortColumn: SortColumn) {
      this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
      this._set({ sortDirection });
    }
  
    private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }

    private _search(): Observable<SearchResult> {
      const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
  
      // 1. sort
      let selling = sort(BestSellingProduct, sortColumn, sortDirection);
  
      // 2. filter
      selling = selling.filter((sellingProduct) => matches(sellingProduct, searchTerm, this.pipe));
      const total = selling.length;
  
      // 3. paginate
      selling = selling.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({ selling, total });
    }
}
