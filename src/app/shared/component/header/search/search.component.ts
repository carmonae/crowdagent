
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as feather from 'feather-icons';

import { SearchService } from '../../../services/search.service';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    CommonModule
    , RouterLink
    , FormsModule
    , SvgIconComponent
  ],
})
export class SearchComponent {
  
  constructor(public searchService : SearchService){}

  ngAfterViewInit() {
    feather.replace();
  }
}
