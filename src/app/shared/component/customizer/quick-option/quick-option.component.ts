import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-quick-option',
  templateUrl: './quick-option.component.html',
  styleUrls: ['./quick-option.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ],
})
export class QuickOptionComponent {

  public layoutType: string = 'ltr';
  public sidebarType: string = 'material-icon';
  public screenwidth = window.innerWidth;
  public icon: string = "stroke-svg";

  constructor(public layout:LayoutService) { }

  
  // Customize Layout Type
  customizeLayoutType(val: string) {
    this.layoutType = val;
    this.layout.config.settings.layout_type = val;
    if(val == 'rtl') {
      document.getElementsByTagName('html')[0].setAttribute('dir', val);
      document.body.className = 'rtl';
    }else if(val == 'box-layout') {
      document.getElementsByTagName('html')[0].setAttribute('dir', val);
      document.body.className = 'box-layout';
    } else {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
      document.body.className = '';
    }
  }

  customizeSidebarType(val: string) {
    this.sidebarType = val;
    this.layout.config.settings.sidebar_type = val;
    this.layout.customizer = '';
  }

  svgIcon(val: string) {
    this.icon = val;
    this.layout.config.settings.icon = val;
    if (val == "stroke-svg") {
      document.getElementsByTagName("page-sub-header")[0]?.setAttribute("icon", val);
    } else {
      document.getElementsByTagName("page-sub-header")[0]?.setAttribute("icon", val);
    }
  } 
}
