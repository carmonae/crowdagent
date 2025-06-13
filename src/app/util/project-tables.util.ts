import { UserprojectI } from '@app/models/user-project';

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
  projects: UserprojectI[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  thedata: UserprojectI[];
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  titles: UserprojectI[],
  column: SortColumn,
  direction: string
): UserprojectI[] {
  if (direction === '' || column === '') {
    return titles;
  } else {
    return [...titles].sort((a: any, b: any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(titleData: UserprojectI, term: string) {
  return (
    titleData.title.toLowerCase().includes(term.toLowerCase()) ||
    titleData.subtitle.toLowerCase().includes(term.toLowerCase()) ||
    titleData.status.toLowerCase().includes(term.toLowerCase())
  );
}

export class ProjectsTableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _projects$ = new BehaviorSubject<UserprojectI[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    thedata: [],
  };

  constructor(private _thedata: UserprojectI[]) {
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
        this._projects$.next(result.projects);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get projects$() {
    return this._projects$.asObservable();
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
  set thedata(thedata: UserprojectI[]) {
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
    let projects = sort(thedata, sortColumn, sortDirection);

    // 2. filter
    projects = projects.filter((proj) => matches(proj, searchTerm));
    const total = projects.length;

    // 3. paginate
    projects = projects.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );

    console.log('projects-tables-util:projects', projects);
    return of({ projects: projects, total });
  }
}
