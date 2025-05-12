import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavService } from '../../../services/nav.service';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, SvgIconComponent],
})
export class NavbarComponent implements OnInit{

  public menus = this.navService.MENUITEM;
  public dataitems = JSON.stringify(this.menus[0].items);
  constructor(private navService : NavService) {
  }

  ngOnInit(): void {}
}
