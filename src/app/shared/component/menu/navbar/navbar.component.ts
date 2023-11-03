import { Component, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  public menus = this.navService.MENUITEM;
  public dataitems = JSON.stringify(this.menus[0].items);
  constructor(private navService : NavService) {
  }

  ngOnInit(): void {}
}
