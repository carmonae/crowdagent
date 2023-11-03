import { Component } from '@angular/core';
import * as feather from 'feather-icons';

import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  
  constructor(public searchService : SearchService){}

  ngAfterViewInit() {
    feather.replace();
  }
}
