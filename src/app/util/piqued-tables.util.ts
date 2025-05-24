import { DecimalPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { PiquedTitlesType } from '@app/shared/data/data/default-dashboard/piqued-titles-mock-data';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  delay,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  SortColumn,
  SortDirection,
} from '../shared/directive/sortable.directive';

interface SearchResult {
  piques: PiquedTitlesType[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  thedata: PiquedTitlesType[];
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  titles: PiquedTitlesType[],
  column: SortColumn,
  direction: string
): PiquedTitlesType[] {
  if (direction === '' || column === '') {
    return titles;
  } else {
    return [...titles].sort((a: any, b: any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(
  titleData: PiquedTitlesType,
  term: string,
  pipe: PipeTransform
) {
  return (
    titleData.title.toLowerCase().includes(term.toLowerCase()) ||
    titleData.subtitle.toLowerCase().includes(term.toLowerCase())
  );
}

export class PiquedTitleTablesService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _titles$ = new BehaviorSubject<PiquedTitlesType[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    thedata: [],
  };

  constructor(private pipe: DecimalPipe, private _thedata: PiquedTitlesType[]) {
    this._state.thedata = _thedata;
    this.searchSubscribe();
  }

  searchSubscribe() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._titles$.next(result.piques);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get titles$() {
    return this._titles$.asObservable();
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
  get thedata() {
    return this._state.thedata;
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
  set thedata(thedata: PiquedTitlesType[]) {
    this._set({ thedata });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm, thedata } =
      this._state;

    // 1. sort
    let piQueing = sort(thedata, sortColumn, sortDirection);

    // 2. filter
    piQueing = piQueing.filter((pique) =>
      matches(pique, searchTerm, this.pipe)
    );
    const total = piQueing.length;

    // 3. paginate
    piQueing = piQueing.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );

    console.log('piqued-tables-util:piQueing', piQueing);
    return of({ piques: piQueing, total });
  }
}
