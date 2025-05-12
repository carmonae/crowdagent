import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { HideNavScrollService } from '../../services/hide-nav-scroll.service';
import { Menu, NavService } from '../../services/nav.service';
import { SearchService } from '../../services/search.service';
import { VerticalNavService } from '../../services/vertical-nav.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { CartComponent } from './cart/cart.component';
import { LanguageComponent } from './language/language.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ThemeModeComponent } from './theme-mode/theme-mode.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule
    , FormsModule
    , RouterLink
    , SvgIconComponent
    , ProfileComponent
    , LanguageComponent
    , CartComponent
    , MessageComponent
    , BookmarkComponent
    , ThemeModeComponent
    , NotificationComponent
    , SearchComponent
  ],
})

export class HeaderComponent {

  public menus = this.navService.verticalMenuItem;
  public menuItems: Menu[] = [];
  public items: Menu[] = [];

  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public open : boolean = false;
  
  constructor(
    public navService: VerticalNavService, 
    public navServices : NavService,
    public hidenav : HideNavScrollService,
    public searchService : SearchService
    ) {
      this.navService.items.subscribe(menuItems => this.items = menuItems);
     }

  openMenu() {
    this.navService.isDisplay = !this.navService.isDisplay;
  }

  languageToggle() {
    this.navServices.language = !this.navServices.language;
  }

  openSearch(){
    this.open = !this.open
  }
  

  searchTerm(term: string){        
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];    
    let items: Menu[] = [];
    term = term.toLowerCase();    
    this.items.filter(menuItems => {
      if (!menuItems?.title) return false
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }      
      if (!menuItems.children) return false
      menuItems.children.filter(subItems => {
        if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon
          items.push(subItems);
        }
        if (!subItems.children) return false
        subItems.children.filter(suSubItems => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon
            items.push(suSubItems);
          }
        })
        return
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items      
      return    
    }
    );
    return
    
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas')
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    document.body.classList.remove('offcanvas')
  }
}

