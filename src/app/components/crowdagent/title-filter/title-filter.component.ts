import { Component } from '@angular/core';
import * as Data from '../../../shared/data/data/job-search/job-search';

@Component({
  selector: 'app-title-filter',
  templateUrl: './title-filter.component.html',
  styleUrls: ['./title-filter.component.scss']
})
export class TitleFilterComponent {

  public filterData = Data.filterData;
  public filterChackBox = Data.filterCheckBox;
  public isCollapsed = false;

  OpenFilter: boolean = false

  constructor() {
  }


  ngOnInit(): void {
  }

  openFilter() {
    this.OpenFilter = !this.OpenFilter
    this.isCollapsed = !this.isCollapsed
  }

}
