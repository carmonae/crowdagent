import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import * as feather from 'feather-icons';
import { HideNavScrollService } from '../../../services/hide-nav-scroll.service';
import { LayoutService } from '../../../services/layout.service';
import { VerticalNavService } from '../../../services/vertical-nav.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { CustomizerComponent } from '../../customizer/customizer.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../menu/navbar/navbar.component';
import { VerticalSidemenuComponent } from '../../menu/vertical-sidemenu/vertical-sidemenu.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [
    CommonModule
    , HeaderComponent
    , CustomizerComponent
    , FooterComponent
    , RouterOutlet
    , BreadcrumbComponent
    , VerticalSidemenuComponent
    , NavbarComponent
  ],
})
export class ContentComponent implements OnInit {

  currentRoute: string | undefined;
  public urlPath: string | undefined;

  constructor(
    public navService: VerticalNavService,
    public layout: LayoutService,
    public hidenav: HideNavScrollService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url;

  }


  ngAfterViewInit() {
    feather.replace();
  }

  get layoutClass() {
    return (
      this.layout.config.settings.sidebar_type +
      ' ' +
      this.layout.config.settings.layout.replace('layout', 'sidebar')
    );
  }

}
