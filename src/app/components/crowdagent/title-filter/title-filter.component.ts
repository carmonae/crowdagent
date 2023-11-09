import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleFilterI, TitleFilter } from 'src/app/models/titleFilter-model';
import * as Data from '../../../shared/data/data/job-search/job-search';

@Component({
  selector: 'app-title-filter',
  templateUrl: './title-filter.component.html',
  styleUrls: ['./title-filter.component.scss']
})
export class TitleFilterComponent {

  @Output() filterEvent: EventEmitter<TitleFilterI> = new EventEmitter<TitleFilterI>;

  public filterData = Data.filterData;
  public filterChackBox = Data.filterCheckBox;
  public isCollapsed = false;

  public searchPattern: string = ''
  public titleFilter: TitleFilterI = new TitleFilter()

  public mainCategories: string[] = ['FICTION', 'NON-FICTION']

  OpenFilter: boolean = false

  constructor() {
  }


  ngOnInit(): void {
  }

  openFilter() {
    this.OpenFilter = !this.OpenFilter
    this.isCollapsed = !this.isCollapsed
  }

  selectSearchBy(searchBy: string): void {
    console.log(searchBy)
    const index = this.titleFilter.search.by.findIndex(entry => entry === searchBy)
    if (index > -1) {
      this.titleFilter.search.by.splice(index, 1)
    }
    else {
      this.titleFilter.search.by.push(searchBy)
    }
  }
  searchTitles(): void {
    console.log('search pattern=', this.searchPattern)
    this.titleFilter.search.pattern = this.searchPattern
    this.filterEvent.emit(this.titleFilter)

  }

}
