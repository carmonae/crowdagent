import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as Data from '@app/shared/data/data/job-search/job-search';
import {
  NgbAccordionModule,
  NgbCollapse,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { galleryGridData } from 'src/app/shared/data/data/gallery/gallery-grid';
import { NavService } from '../../../services/nav.service';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbModule,
    TranslateModule,
    RouterLink,
    SvgIconComponent,
  ],
})
export class NavbarComponent implements OnInit {
  @ViewChild('collapse') collapse = NgbCollapse;
  public isCollapsed = true;
  OpenFilter: boolean = false;

  public filterData = Data.filterData;
  public filterChackBox = Data.filterCheckBox;
  public galleryGridData = galleryGridData;
  public processMap = [
    {
      laneName: 'As Account Owner',
      color: 'blue',
      steps: [
        {
          label: 'Choose Some Genres',
          path: 'users/users-edit',
        },
        {
          label: 'Specify Bank Details',
          path: 'users/users-edit',
        },
        {
          label: 'Change Your Plan',
          path: 'users/users-edit',
        },
      ],
    },

    {
      laneName: 'As Author',
      color: '',
      steps: [
        {
          label: 'Register As Author',
          path: 'users/users-edit',
        },
        {
          label: 'Sign Royalty Form',
          path: 'users/users-edit',
        },
        {
          label: 'Create New Project',
          path: 'projects/create-new',
        },
        {
          label: 'Review Your Projects',
          path: 'projects/project-list',
        },
        {
          label: 'Edit Your Project',
          path: 'projects/project-list',
        },
        {
          label: 'Publish A Project',
          path: 'projects/project-list',
        },
        {
          label: 'Watch Your Results',
          path: 'dashboard',
        },
        {
          label: 'Reply To Comment',
          path: 'commingsoon',
        },
        {
          label: 'Choose Literary Agent',
          path: 'commingsoon',
        },
        {
          label: 'Seek A Freelancer',
          path: 'commingsoon',
        },
      ],
    },
    {
      laneName: 'As Reader',
      color: '',
      steps: [
        {
          label: 'Pick Some Titles',
          path: 'crowdagent/piquetitle',
        },
        {
          label: 'Rate Your piQues',
          path: 'crowdagent/reviewpiques',
        },
        {
          label: 'View Your Reviews',
          path: 'crowdagent/listreviews',
        },
        {
          label: 'Watch Your Dashboard',
          path: 'dashboard/readers',
        },
      ],
    },
    {
      laneName: 'As Literary Agent - Comming Soon',
      color: '',
      steps: [
        {
          label: 'Contact Author',
          path: 'commingsoon',
        },
      ],
    },
    {
      laneName: 'As Publisher - Comming Soon',
      color: '',
      steps: [
        {
          label: 'Seek Lit Agent',
          path: 'commingsoon',
        },
      ],
    },
    {
      laneName: 'As Freelancer - Comming Soon',
      color: '',
      steps: [
        {
          label: 'Message Author',
          path: 'commingsoon',
        },
      ],
    },
  ];

  public menus = this.navService.MENUITEM;
  public dataitems = JSON.stringify(this.menus[0].items);
  constructor(private navService: NavService, private router: Router) {}

  ngOnInit(): void {}

  openFilter() {
    this.OpenFilter = !this.OpenFilter;
  }

  onNavigate(path: string) {
    this.openFilter();
    this.router.navigate(path.split('/'));
  }
}
